/**
 * Sube el contenido de dist/ al hosting por FTPS explicito.
 * No hace falta instalar ningun programa: usa Node, que ya esta instalado.
 *
 * La contrasena NO se guarda en ningun archivo. Se lee de una variable de
 * entorno que vos cargas en la terminal, y que se borra al cerrarla.
 *
 *   PowerShell:   $env:FTP_PASSWORD = "la-contrasena"
 *   Git Bash:     export FTP_PASSWORD='la-contrasena'
 *
 * Modos de uso:
 *
 *   npm run deploy:list     Solo se conecta y muestra que hay en el servidor.
 *                           No sube ni borra nada. Empeza siempre por aca.
 *
 *   npm run deploy:dry      Lista los archivos que se subirian, sin conectarse.
 *
 *   npm run deploy          Sube dist/ a public_html.
 *
 * Si el servidor presenta un certificado que no valida (pasa seguido en
 * hostings compartidos), agregar  --insecure-tls  al final del comando.
 */
import { Client } from 'basic-ftp'
import fs from 'fs'
import path from 'path'

const HOST       = process.env.FTP_HOST   || 'ftp.mariajosementana.com'
const USER       = process.env.FTP_USER   || 'infomariajosementana@mariajosementana.com'
const PASSWORD   = process.env.FTP_PASSWORD
const PORT       = Number(process.env.FTP_PORT || 21)
const REMOTE_DIR = process.env.FTP_REMOTE_DIR || 'public_html'

const LOCAL_DIR = path.resolve(process.cwd(), 'dist')

const args        = process.argv.slice(2)
const MODE_LIST   = args.includes('--list')
const MODE_DRY    = args.includes('--dry')
const INSECURE    = args.includes('--insecure-tls')

const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

// ------------------------------------------------ chequeos previos locales

if (!fs.existsSync(LOCAL_DIR)) {
  console.error('\nNo existe la carpeta dist/.')
  console.error('Compila primero con:  npm run build\n')
  process.exit(1)
}

const localFiles = walk(LOCAL_DIR)
const totalBytes = localFiles.reduce((s, f) => s + fs.statSync(f).size, 0)

const tieneIndex    = fs.existsSync(path.join(LOCAL_DIR, 'index.html'))
const tieneHtaccess = fs.existsSync(path.join(LOCAL_DIR, '.htaccess'))

console.log('\n== Que se va a subir ==')
console.log(`   carpeta local : ${LOCAL_DIR}`)
console.log(`   archivos      : ${localFiles.length}`)
console.log(`   peso total    : ${mb(totalBytes)}`)
console.log(`   index.html    : ${tieneIndex ? 'si' : 'NO ENCONTRADO'}`)
console.log(`   .htaccess     : ${tieneHtaccess ? 'si' : 'NO ENCONTRADO'}`)

if (!tieneIndex || !tieneHtaccess) {
  console.error('\nFalta index.html o .htaccess en dist/. Volve a correr:  npm run build\n')
  process.exit(1)
}

if (MODE_DRY) {
  console.log('\n== Archivos ==')
  for (const f of localFiles) {
    console.log('   ' + path.relative(LOCAL_DIR, f).split(path.sep).join('/'))
  }
  console.log('\n(modo dry: no se conecto a ningun servidor)\n')
  process.exit(0)
}

if (!PASSWORD) {
  console.error('\nFalta la contrasena del FTP.')
  console.error('Cargala en la terminal antes de correr el comando:\n')
  console.error('   PowerShell:  $env:FTP_PASSWORD = "la-contrasena"')
  console.error('   Git Bash:    export FTP_PASSWORD=\'la-contrasena\'\n')
  process.exit(1)
}

// ------------------------------------------------------------- conexion

const client = new Client(60000)
client.ftp.verbose = false

try {
  console.log(`\n== Conectando a ${HOST}:${PORT} (FTPS explicito) ==`)
  if (INSECURE) console.log('   (verificacion de certificado desactivada)')

  await client.access({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    secure: true,                                   // FTPS explicito (AUTH TLS)
    secureOptions: { rejectUnauthorized: !INSECURE },
  })

  console.log('   conectado.')
  console.log(`   carpeta inicial en el servidor: ${await client.pwd()}`)

  // ---------------------------------------------------------- modo lista
  if (MODE_LIST) {
    console.log('\n== Contenido de la carpeta inicial ==')
    for (const item of await client.list()) {
      console.log(`   ${item.isDirectory ? '[dir] ' : '      '}${item.name}`)
    }

    try {
      await client.cd(REMOTE_DIR)
      console.log(`\n== Contenido de ${REMOTE_DIR} ==`)
      const items = await client.list()
      if (items.length === 0) console.log('   (vacia)')
      for (const item of items) {
        console.log(`   ${item.isDirectory ? '[dir] ' : '      '}${item.name}`)
      }
    } catch {
      console.log(`\n   No se pudo entrar a "${REMOTE_DIR}" desde aca.`)
      console.log('   Puede ser que el usuario FTP ya caiga adentro de public_html.')
      console.log('   Mira el listado de arriba: si ves index.html o assets, ya estas adentro.')
      console.log('   En ese caso corre el deploy con:  FTP_REMOTE_DIR=. npm run deploy')
    }

    console.log('\n(modo lista: no se subio ni se borro nada)\n')
    process.exit(0)
  }

  // ---------------------------------------------------------- subida
  console.log(`\n== Subiendo a ${REMOTE_DIR} ==`)

  let subidos = 0
  client.trackProgress((info) => {
    if (info.type === 'upload' && info.name) {
      subidos++
      process.stdout.write(`   [${String(subidos).padStart(3)}/${localFiles.length}] ${info.name}\n`)
    }
  })

  await client.ensureDir(REMOTE_DIR)
  await client.uploadFromDir(LOCAL_DIR)
  client.trackProgress()

  // ---------------------------------------------------------- verificacion
  console.log('\n== Verificando en el servidor ==')
  const remotos = await client.list()
  const nombres = remotos.map((r) => r.name)

  const chequeos = [
    ['index.html', nombres.includes('index.html')],
    ['.htaccess',  nombres.includes('.htaccess')],
    ['assets/',    nombres.includes('assets')],
  ]

  let falla = false
  for (const [nombre, ok] of chequeos) {
    console.log(`   ${ok ? 'OK  ' : 'FALTA'}  ${nombre}`)
    if (!ok) falla = true
  }

  if (nombres.includes('dist')) {
    console.log('\n   ATENCION: hay una carpeta "dist" en el servidor.')
    console.log('   El sitio tiene que quedar suelto en public_html, no adentro de dist/.')
    falla = true
  }

  if (falla) {
    console.log('\n   Algo no quedo bien. Revisa el listado del servidor con:  npm run deploy:list\n')
  } else {
    console.log('\n   Todo en su lugar.')
    console.log('   Abri https://mariajosementana.com y despues entra a Biografia y recarga con F5.\n')
  }
} catch (err) {
  console.error('\n== Error ==')
  console.error('   ' + err.message)

  const m = String(err.message).toLowerCase()
  if (m.includes('certificate') || m.includes('self signed') || m.includes('altname')) {
    console.error('\n   Es un problema de certificado, no de la contrasena.')
    console.error('   Es normal en hostings compartidos. Volve a correr el comando agregando:')
    console.error('      npm run deploy -- --insecure-tls')
  } else if (m.includes('530') || m.includes('login')) {
    console.error('\n   Usuario o contrasena rechazados. Revisa que FTP_PASSWORD este bien cargada.')
  } else if (m.includes('enotfound') || m.includes('etimedout') || m.includes('econnrefused')) {
    console.error('\n   No se pudo llegar al servidor. Revisa la conexion a internet,')
    console.error('   o si el firewall o el antivirus estan bloqueando el FTP.')
  }
  console.error('')
  process.exitCode = 1
} finally {
  client.close()
}
