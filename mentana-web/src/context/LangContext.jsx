import { createContext, useContext, useState } from 'react'
import { discographyAlbums } from '../data/discographyAlbums'

export const LangContext = createContext({ lang: 'es', setLang: () => {} })
export const useLang = () => useContext(LangContext)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const t = {
  // ── Hero ──
  hero: {
    meta1:    { es: 'Cantante de Tango',         en: 'Tango Singer'            },
    meta2:    { es: 'Más de 55 años de carrera', en: 'Over 55 years of career' },
    metaGold: {
      es: 'Personalidad Destacada de la Cultura · Buenos Aires',
      en: 'Outstanding Cultural Personality · Buenos Aires',
    },
    scroll: { es: 'scroll', en: 'scroll' },
  },

  // ── About ──
  about: {
    heading:    { es: 'La Artista',    en: 'The Artist'    },
    paragraphs: [
      {
        es: 'Rosana Inés nació en San Isidro — y María José nació con la música. A los nueve años debutó en Grandes Valores del Tango — y desde entonces el escenario fue su casa.',
        en: 'Rosana Inés was born in San Isidro — and María José was born with the music. At the age of nine, she made her debut on Grandes Valores del Tango—and since then, the stage has been her home.',
      },
      {
        es: 'Creció rodeada de los grandes referentes del género — Tita Merello, Nelly Omar, Roberto Goyeneche, Floreal Ruiz, Mariano Mores, Leopoldo Federico, Raúl Garello y Horacio Ferrer, entre otros. De ellos aprendió lo más valioso: el sentir, la intención, todo aquello que no se escribe pero se vive. Junto a ellos grabó, viajó y dejó su voz en los escenarios más importantes de Europa, Japón, China y Latinoamérica — teatros que son historia.',
        en: 'She grew up surrounded by the greatest legends of the genre—Tita Merello, Nelly Omar, Roberto Goyeneche, Floreal Ruiz, Mariano Mores, Leopoldo Federico, Raúl Garello, and Horacio Ferrer, among others. From them, she learned what is most valuable: the feeling, the intention, everything that cannot be written but must be lived. Alongside them, she recorded, traveled, and left her voice on the most important stages of Europe, Japan, China, and Latin America—theaters that are history.',
      },
      {
        es: 'Personalidad Destacada de la Cultura por la Legislatura de la Ciudad de Buenos Aires. Académica Titular de la Academia Nacional del Tango. Nominada a los Premios Gardel. Solista con orquestas sinfónicas. Creadora del espectáculo Mujer Tango, un homenaje a las mujeres que hicieron historia en el tango y que la formaron como artista.',
        en: 'Outstanding Cultural Personality by the Legislature of the City of Buenos Aires. Full Academician of the National Academy of Tango. Nominated for the Gardel Awards. Soloist with symphony orchestras. Creator of the show Mujer Tango, a tribute to the women who made history in tango and who shaped her as an artist.',
      },
      {
        es: 'Hoy sigue tan vigente como siempre: cantando tangos sinfónicos junto a grandes orquestas, grabando y produciendo junto a su hijo Lucas Russo en su propio MJEstudio de Grabación, y acompañando a nuevos artistas como coach y productora artística.',
        en: 'Today she remains as active and relevant as ever: singing symphonic tangos alongside great orchestras, recording and producing with her son Lucas Russo at their own MJEstudio de Grabación, and guiding emerging artists as a coach and artistic producer.',
      },
      {
        es: 'Una vida entera con la música — y siempre hay más por vivir y cantar.',
        en: 'A lifetime dedicated to music—and there is always more to live and sing.',
      },
    ],
    yearsLabel: { es: 'años de\nexperiencia', en: 'years of\nexperience' },
    quote: {
      una: { es: 'Una', en: 'A' },
      rest: {
        es: 'voz que atravesó continentes, llevando el tango argentino a cada rincón del mundo.',
        en: 'voice that crossed continents, bringing Argentine tango to every corner of the world.',
      },
      emphasis: {
        es: 'atravesó continentes',
        en: 'crossed continents',
      },
    },
  },

  // ── Press ──
  press: {
    sectionLabel: { es: 'Reconocimientos', en: 'Recognition' },
    heading:      { es: 'Una carrera reconocida', en: 'A celebrated career' },
    subheading: {
      es: 'Más de cinco décadas sobre los escenarios del mundo, avaladas por los más altos reconocimientos del tango argentino.',
      en: "Over five decades on the world's stages, backed by the highest honours in Argentine tango.",
    },
    distinctions: { es: 'Distinciones oficiales', en: 'Official distinctions' },
    actedWith:    { es: 'Actuó junto a',          en: 'Performed alongside'   },
    stats: {
      years:      { es: 'años de carrera',  en: 'years of career' },
      continents: { es: 'continentes',      en: 'continents'      },
      cities:     { es: 'ciudades en Asia', en: 'cities in Asia'  },
    },
    dists: [
      { es: 'Personalidad Destacada de la Cultura',        en: 'Outstanding Cultural Personality'     },
      { es: 'Académica de la Academia Nacional del Tango', en: 'Member of the National Tango Academy' },
      { es: 'Premio en Venezuela',                         en: 'Award in Venezuela'                   },
      { es: 'Premio en Uruguay',                           en: 'Award in Uruguay'                     },
    ],
    orgs: [
      { es: 'Ciudad de Buenos Aires',       en: 'City of Buenos Aires'    },
      { es: 'Academia Nacional del Tango',  en: 'National Tango Academy'  },
      { es: 'Gira por América — 1970s',     en: 'American Tour — 1970s'   },
      { es: 'Gira por América — 1970s',     en: 'American Tour — 1970s'   },
    ],
  },

  // ── Biography (Home timeline) ──
  biography: {
    sectionLabel: { es: 'Trayectoria', en: 'Career' },
    headingTitle: {
      es: 'Más de 55 años<br /><em>sobre los escenarios del mundo</em>',
      en: "Over 55 years<br /><em>on the world's stages</em>",
    },
    headerSub: {
      es: 'Desde Canal 9 a los teatros de Tokio, Caracas y París — una historia de vida contada en tangos.',
      en: 'From Canal 9 to the theaters of Tokyo, Caracas and Paris — a life story told in tangos.',
    },
    quoteText: {
      es: '«Personalidad Destacada de la Cultura de la Ciudad de Buenos Aires»',
      en: '"Outstanding Cultural Personality of the City of Buenos Aires"',
    },
    quoteCite: {
      es: 'Legislatura de la Ciudad Autónoma de Buenos Aires',
      en: 'Legislature of the Autonomous City of Buenos Aires',
    },
    milestones: [
      {
        year: '1961',
        era:    { es: 'Los orígenes',  en: 'The origins'  },
        title:  { es: 'Nace en San Isidro', en: 'Born in San Isidro' },
        text: {
          es: 'Rosana Inés Mentana nace el 31 de enero en San Isidro, Buenos Aires. Desde pequeña canta en los clubes de su barrio, descubriendo una voz que el tango reclamaría para siempre.',
          en: 'Rosana Inés Mentana is born on January 31 in San Isidro, Buenos Aires. Since childhood she sings in the clubs of her neighborhood, discovering a voice that tango would claim forever.',
        },
        detail: { es: 'San Isidro, Buenos Aires', en: 'San Isidro, Buenos Aires' },
      },
      {
        year: '1970',
        era:   { es: 'La revelación',   en: 'The revelation'   },
        title: { es: 'La Niña Prodigio', en: 'The Child Prodigy' },
        text: {
          es: 'A los nueve años debuta en "Grandes Valores del Tango" de Canal 9, conducido por Juan Carlos Thorry. La crítica la bautiza: "La Niña Prodigio". Comparte escenario con Goyeneche, Pugliese, Tita Merello.',
          en: 'At age nine she debuts on "Grandes Valores del Tango" on Canal 9, hosted by Juan Carlos Thorry. Critics dub her "The Child Prodigy". She shares the stage with Goyeneche, Pugliese, Tita Merello.',
        },
        detail: { es: 'Canal 9, Buenos Aires', en: 'Canal 9, Buenos Aires' },
      },
      {
        year: '1973–78',
        era:   { es: 'Los primeros discos', en: 'The early records'     },
        title: { es: 'Una voz en tres idiomas', en: 'A voice in three languages' },
        text: {
          es: 'Graba tres discos que incluyen temas en japonés. La primera gran gira latinoamericana: Argentina, Chile, Brasil, Uruguay, Venezuela y Colombia. Premios en Venezuela y Uruguay.',
          en: 'Records three albums that include songs in Japanese. The first major Latin American tour: Argentina, Chile, Brazil, Uruguay, Venezuela and Colombia. Awards in Venezuela and Uruguay.',
        },
        detail: { es: 'América Latina', en: 'Latin America' },
      },
      {
        year: '1984',
        era:   { es: 'La conquista de Europa', en: 'The conquest of Europe' },
        title: { es: 'París',                  en: 'Paris'                  },
        text: {
          es: 'Viaja a Europa con Osvaldo Piro para "Trottoirs de Buenos Aires". Actúa en la Galerie de Nesle, París. Graba un disco en Francia. El tango argentino llega a los escenarios más refinados de Europa.',
          en: 'Travels to Europe with Osvaldo Piro for "Trottoirs de Buenos Aires". Performs at the Galerie de Nesle, Paris. Records an album in France. Argentine tango reaches the most refined stages of Europe.',
        },
        detail: { es: 'París, Francia', en: 'Paris, France' },
      },
      {
        year: '1991',
        era:   { es: 'Oriente',         en: 'The East'      },
        title: { es: 'Japón: 55 ciudades', en: 'Japan: 55 cities' },
        text: {
          es: 'Viaja a Japón con Néstor Marconi y graba "Tanguísimo 91". Al año siguiente regresa con Mariano Mores. El Sexteto Mayor la convoca de vuelta a Europa. Una artista sin fronteras geográficas.',
          en: 'Travels to Japan with Néstor Marconi and records "Tanguísimo 91". The following year she returns with Mariano Mores. The Sexteto Mayor calls her back to Europe. An artist without geographical borders.',
        },
        detail: { es: 'Japón, Europa', en: 'Japan, Europe' },
      },
      {
        year: '1991–2001',
        era:   { es: 'Venezuela',            en: 'Venezuela'              },
        title: { es: 'La orquesta sinfónica', en: 'The symphony orchestra' },
        text: {
          es: 'Una década de trabajo destacado en teatro y televisión venezolana. Múltiples grabaciones. En 2001 cumple el sueño de cantar con la Orquesta Sinfónica de Venezuela en el Teatro Teresa Carreño de Caracas.',
          en: "A decade of outstanding work in Venezuelan theatre and television. Multiple recordings. In 2001 she fulfills the dream of singing with the Symphony Orchestra of Venezuela at Caracas's Teresa Carreño Theatre.",
        },
        detail: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela' },
      },
      {
        year: '2002',
        era:   { es: 'Récord asiático', en: 'Asian record'  },
        title: { es: 'Asia: 65 ciudades', en: 'Asia: 65 cities' },
        text: {
          es: '55 ciudades de Japón y 10 de Taiwán en una sola gira. Es invitada permanente de la Orquesta Nacional "Juan de Dios Filiberto", dirigida por Néstor Marconi y Atilio Stampone.',
          en: '55 cities in Japan and 10 in Taiwan in a single tour. She is a permanent guest of the National Orchestra "Juan de Dios Filiberto", conducted by Néstor Marconi and Atilio Stampone.',
        },
        detail: { es: 'Japón · Taiwán', en: 'Japan · Taiwan' },
      },
      {
        year: '2003',
        era:   { es: 'El legado',        en: 'The legacy'   },
        title: { es: 'Este es mi lugar', en: 'This is my place' },
        text: {
          es: 'Graba "Este es mi Lugar" con músicos jóvenes — un gesto de continuidad. El tango pasa de generación en generación. Ella es la bisagra.',
          en: 'Records "Este es mi Lugar" with young musicians — a gesture of continuity. Tango passes from generation to generation. She is the bridge.',
        },
        detail: { es: 'Buenos Aires', en: 'Buenos Aires' },
      },
      {
        year: '2013',
        era:   { es: 'Reconocimiento oficial', en: 'Official recognition'  },
        title: { es: 'Personalidad Destacada', en: 'Outstanding Personality' },
        text: {
          es: 'La Legislatura porteña la declara Personalidad Destacada de la Cultura de la Ciudad de Buenos Aires. La Academia Nacional del Tango la incorpora como académica.',
          en: 'The city Legislature declares her an Outstanding Cultural Personality of the City of Buenos Aires. The National Tango Academy incorporates her as an academic.',
        },
        detail: { es: 'Ciudad de Buenos Aires', en: 'City of Buenos Aires' },
      },
      {
        year: '2025',
        era:   { es: 'Presente',    en: 'Present'      },
        title: { es: 'Mujer Tango', en: 'Tango Woman'  },
        text: {
          es: 'Lanza "Mujer Tango" (EPSA Music), un disco que recupera la frescura del tango de principios de siglo con composiciones inéditas junto a Pablo Fraguela, Ramón Maschio y Raimundo Rosales.',
          en: 'Releases "Mujer Tango" (EPSA Music), an album that recovers the freshness of early century tango with unreleased compositions alongside Pablo Fraguela, Ramón Maschio and Raimundo Rosales.',
        },
        detail: { es: 'Buenos Aires · hoy', en: 'Buenos Aires · today' },
      },
    ],
  },

  // ── Biography PAGE ──
  biographyPage: {
    sectionLabel: { es: 'Biografía', en: 'Biography' },
    heroTitle: {
      es: 'Una voz que<br /><em>el tango reclamó</em><br />para siempre',
      en: 'A voice that<br /><em>tango claimed</em><br />forever',
    },
    heroSub: {
      es: 'Rosana Inés Mentana — artista, docente, compositora. Más de 55 años sobre los escenarios del mundo, desde los estudios de Canal 9 hasta las grandes salas de Tokio, París y Caracas.',
      en: "Rosana Inés Mentana — artist, teacher, composer. Over 55 years on the world's stages, from the studios of Canal 9 to the great halls of Tokyo, Paris and Caracas.",
    },
    bornLabel: { es: 'Fecha de nacimiento', en: 'Date of birth' },
    stats: {
      years:      { es: 'años de carrera',    en: 'years of career'    },
      continents: { es: 'continentes',        en: 'continents'         },
      concerts:   { es: 'conciertos en Asia', en: 'concerts in Asia'   },
      albums:     { es: 'álbumes grabados',   en: 'albums recorded'    },
    },
    introLabel: { es: 'El perfil', en: 'The profile' },
    introTitle: {
      es: 'Heredera directa<br /><em>de la Época de Oro</em>',
      en: 'Direct heir<br /><em>of the Golden Age</em>',
    },
    introPara1: {
      es: 'Nacida el 31 de enero de 1961 en San Isidro, provincia de Buenos Aires, Rosana Inés Mentana —conocida artísticamente como María José Mentana— se consolidó a lo largo de las décadas como una de las voces femeninas más trascendentales de la música ciudadana del Río de la Plata.',
      en: 'Born on January 31, 1961 in San Isidro, province of Buenos Aires, Rosana Inés Mentana —known artistically as María José Mentana— consolidated herself over the decades as one of the most transcendental female voices of Río de la Plata popular music.',
    },
    introPara2: {
      es: 'Con una carrera ininterrumpida que abarca más de cincuenta años de actividad profesional, su figura representa un puente viviente e irreemplazable entre la legendaria "Época de Oro" del tango, las vanguardias de finales del siglo XX y las expresiones contemporáneas del siglo XXI. Su trayectoria abarca la interpretación, la composición, la dramaturgia teatral, la docencia universitaria y la preservación activa del patrimonio inmaterial porteño.',
      en: "With an uninterrupted career spanning over fifty years of professional activity, her figure represents a living and irreplaceable bridge between the legendary \"Golden Age\" of tango, the avant-garde movements of the late 20th century, and contemporary expressions of the 21st century. Her career spans performance, composition, theatrical dramaturgy, university teaching, and the active preservation of Buenos Aires's intangible cultural heritage.",
    },
    introPara3: {
      es: 'Es miembro de número de la Academia Nacional del Tango y la Academia Porteña del Lunfardo, y fue declarada Personalidad Destacada de la Cultura de la Ciudad Autónoma de Buenos Aires por la Legislatura porteña en 2015. Titular de la cátedra de canto en la Universidad Nacional de las Artes (UNA), su legado trasciende el escenario para instalarse en la transmisión oral de los saberes del género.',
      en: "She is a full member of the National Tango Academy and the Porteña Lunfardo Academy, and was declared an Outstanding Cultural Personality of the Autonomous City of Buenos Aires by the city legislature in 2015. As holder of the vocal chair at the National University of the Arts (UNA), her legacy transcends the stage to reside in the oral transmission of the genre's knowledge.",
    },
    introQuote: {
      es: '«Me considero inmensamente privilegiada por haber sido depositaria directa de las enseñanzas orales de los grandes maestros del tango.»',
      en: '"I consider myself immensely privileged to have been a direct recipient of the oral teachings of the great tango masters."',
    },
    introQuoteCite: { es: 'María José Mentana', en: 'María José Mentana' },
    chaptersLabel: { es: 'Trayectoria', en: 'Career' },
    chaptersTitle: {
      es: 'Seis décadas<br /><em>de historia viva</em>',
      en: 'Six decades<br /><em>of living history</em>',
    },
    era1:   { es: 'La revelación',          en: 'The revelation'           },
    title1: { es: 'La Niña Prodigio de Canal 9', en: 'The Child Prodigy of Canal 9' },
    text1: {
      es: 'A los nueve años debuta en "Grandes Valores del Tango" de Canal 9, conducido por Juan Carlos Thorry, con Tito Lusiardo como figura estelar. Su talento innato fue descubierto por el legendario publicista Tito Scopesi mientras cantaba entre las mesas de un restaurante de San Isidro. Rápidamente se convierte en figura habitual de "Los Fabulosos 20" y "El Tango del Millón". En 1972 graba su primer disco con el sello Microfón, acompañada por la orquesta del maestro Osvaldo Requena. En 1973 recibe el Premio de Honor de Radio Caracas Televisión y el Premio a la Fama de Uruguay.',
      en: 'At age nine she debuts on "Grandes Valores del Tango" on Canal 9, hosted by Juan Carlos Thorry, with Tito Lusiardo as the star guest. Her innate talent was discovered by legendary publicist Tito Scopesi while she sang between tables at a San Isidro restaurant. She quickly becomes a regular on "Los Fabulosos 20" and "El Tango del Millón". In 1972 she records her first album on the Microfón label with maestro Osvaldo Requena\'s orchestra. In 1973 she receives the Honor Award from Radio Caracas Televisión and the Fame Award from Uruguay.',
    },
    loc1: { es: 'Canal 9 · Buenos Aires · América Latina', en: 'Canal 9 · Buenos Aires · Latin America' },
    era2:   { es: 'La bohemia porteña', en: 'The Buenos Aires bohemia' },
    title2: { es: 'Las noches de El Viejo Almacén y Caño 14', en: 'The nights of El Viejo Almacén and Caño 14' },
    text2: {
      es: 'Abandonando los estudios televisivos, Mentana se sumerge en el exigente circuito de la bohemia porteña. Noche a noche actúa en "El Viejo Almacén" y "Caño 14". Allí forja su temple junto a los grandes maestros: Roberto "Polaco" Goyeneche, Osvaldo Pugliese, Edmundo Rivero, Néstor Marconi, Horacio Salgán y Leopoldo Federico. Profundiza el vínculo con las grandes voces femeninas históricas: Tita Merello, Nelly Omar, Beba Bidart y Mercedes Simone, de quien conserva una carta manuscrita. En 1981 actúa en la Casa Rosada junto a Domingo Cura y Osvaldo Piro. Graba "Una Piba y un Tango", álbum que marca su transición de niña prodigio a artista adulta.',
      en: 'Leaving television studios behind, Mentana immerses herself in the demanding Buenos Aires bohemian circuit. Night after night she performs at "El Viejo Almacén" and "Caño 14". There she forges her stage temperament alongside the great masters: Roberto "Polaco" Goyeneche, Osvaldo Pugliese, Edmundo Rivero, Néstor Marconi, Horacio Salgán and Leopoldo Federico. She deepens bonds with the great historical female voices: Tita Merello, Nelly Omar, Beba Bidart and Mercedes Simone, from whom she preserves a handwritten letter. In 1981 she performs at the Casa Rosada alongside Domingo Cura and Osvaldo Piro. She records "Una Piba y un Tango", marking her transition from child prodigy to adult artist.',
    },
    loc2: { es: 'Buenos Aires · Argentina', en: 'Buenos Aires · Argentina' },
    era3:   { es: 'La conquista de Europa', en: 'The conquest of Europe' },
    title3: { es: 'París y el bautismo de Horacio Ferrer', en: 'Paris and the baptism by Horacio Ferrer' },
    text3: {
      es: 'Entre 1984 y 1989 se radica en París. Brilla en la Galerie de Nesle y en el mítico "Trottoirs de Buenos Aires" —epicentro de la intelectualidad argentina en el exilio—. Extiende giras a Holanda, Italia, Finlandia, Bélgica y Suecia. En Suiza comparte cartelera con Frank Sinatra. Es en París, bajo la dirección de Osvaldo Piro, que el poeta Horacio Ferrer —co-creador de las obras de Piazzolla— sube al escenario y le aconseja incorporar su apellido "Mentana" para sellar su identidad como artista adulta. Desde ese momento, "María José Mentana" se convierte en su nombre definitivo.',
      en: 'Between 1984 and 1989 she settles in Paris. She shines at the Galerie de Nesle and the mythical "Trottoirs de Buenos Aires" — the epicentre of Argentine intellectual life in exile —. She extends tours to Holland, Italy, Finland, Belgium and Sweden. In Switzerland she shares the bill with Frank Sinatra. It is in Paris, under the direction of Osvaldo Piro, that poet Horacio Ferrer — co-creator of Piazzolla\'s works — takes the stage and advises her to add her surname "Mentana" to seal her identity as a mature artist. From that moment, "María José Mentana" becomes her definitive name.',
    },
    loc3: { es: 'París · Europa · Suiza', en: 'Paris · Europe · Switzerland' },
    era4:   { es: 'La embajadora transcontinental', en: 'The transcontinental ambassador' },
    title4: { es: 'Japón, Venezuela y las orquestas sinfónicas', en: 'Japan, Venezuela and the symphony orchestras' },
    text4: {
      es: 'En 1991 realiza 52 conciertos en Japón con Néstor Marconi, inmortalizados en "Tanguísimo 91". Al año siguiente regresa con Mariano Mores para 42 funciones más. Entre 1993 y 1997 integra el Sexteto Mayor en giras europeas donde interpreta "Don\'t Cry for Me Argentina" con un traje original de Eva Perón cedido por el modisto Paco Jamandreu. En 1994 se traslada a Venezuela: produce el show con Simón Díaz (1998), conduce "Desde Tango y Tango" en TV (1999) y programas en Mágica 99.1 FM y Jazz 95.5 FM (2001). Ese año canta con la Orquesta Sinfónica de Venezuela en el Hotel Caracas Hilton, grabando el álbum en vivo "Sinfónica Venezuela". Entre 2002 y 2005: 55 conciertos en Japón y 10 en Taiwán.',
      en: 'In 1991 she performs 52 concerts in Japan with Néstor Marconi, immortalized in "Tanguísimo 91". The following year she returns with Mariano Mores for 42 more shows. Between 1993 and 1997 she joins the Sexteto Mayor for European tours performing "Don\'t Cry for Me Argentina" wearing an original Eva Perón dress lent by designer Paco Jamandreu. In 1994 she moves to Venezuela: produces the show with Simón Díaz (1998), hosts "Desde Tango y Tango" on TV (1999) and programs on Mágica 99.1 FM and Jazz 95.5 FM (2001). That year she sings with the Symphony Orchestra of Venezuela at the Caracas Hilton, recording the live album "Sinfónica Venezuela". Between 2002 and 2005: 55 concerts in Japan and 10 in Taiwan.',
    },
    loc4: { es: 'Japón · Taiwán · Venezuela · Europa', en: 'Japan · Taiwan · Venezuela · Europe' },
    era5:   { es: 'La dramaturga y compositora', en: 'The playwright and composer' },
    title5: { es: 'CienTROILOS y el teatro en Corrientes', en: 'CienTROILOS and theater on Corrientes' },
    text5: {
      es: 'En 2010 edita "En vivo 40 años" con composiciones propias, entre ellas "Candombe Santelmero". En 2012 escribe, dirige y produce "De Buenos Aires a París", obra que llega al Teatro Maipo en 2013 durante tres meses. En 2014, para el centenario de Troilo, produce "Las Minas de Troilo" con el investigador Gabriel Soria, y graba el monumental "CienTROILOS" con Stampone, Federico, Garello, Baffa, Berlingieri, Litto Nebbia y Horacio Ferrer. El disco es nominado al Premio Carlos Gardel 2015. Ese año la Legislatura porteña la declara Personalidad Destacada de la Cultura. Entre 2006 y 2007 actúa en la compañía "Tango x 2" de Miguel Ángel Zotto en el Piccadilly Theater de Londres.',
      en: 'In 2010 she releases "En vivo 40 años" with original compositions including "Candombe Santelmero". In 2012 she writes, directs and produces "De Buenos Aires a París", which reaches the Teatro Maipo in 2013 for three months. In 2014, for the Troilo centenary, she produces "Las Minas de Troilo" with researcher Gabriel Soria, and records the monumental "CienTROILOS" with Stampone, Federico, Garello, Baffa, Berlingieri, Litto Nebbia and Horacio Ferrer. The album is nominated for the 2015 Carlos Gardel Award. That year the Buenos Aires legislature declares her an Outstanding Cultural Personality. Between 2006 and 2007 she performs with Miguel Ángel Zotto\'s "Tango x 2" company at the Piccadilly Theater in London.',
    },
    loc5: { es: 'Buenos Aires · Londres · Israel', en: 'Buenos Aires · London · Israel' },
    era6:   { es: 'Vigencia y vanguardia', en: 'Vitality and avant-garde' },
    title6: { es: 'Mujer Tango y la escena contemporánea', en: 'Mujer Tango and the contemporary scene' },
    text6: {
      es: 'Tras la pandemia, regresa con vigor a los escenarios. Brinda conciertos íntimos en la Sala de Cámara de la Usina del Arte junto al pianista Oscar De Elía, y presenta "Que sea tango" en el Palacio Libertad (ex CCK) con De Elía y el saxofonista Bernardo Baraj. El 11 de abril de 2026 actúa en vivo en Radio Rivadavia AM 630, en el programa "La Radio Sos Vos" de Julio Lagos. El 20 de agosto de 2025 estrena el espectáculo "Mujer Tango" en el Festival Tango BA, en el Claridge Bar. El 17 de septiembre de 2025 lanza globalmente el álbum "Mujer Tango": nueve canciones que reivindican la perspectiva femenina en el tango con raíces afro-rioplatenses y mirada del siglo XXI.',
      en: 'After the pandemic, she returns vigorously to the stage. She gives intimate concerts at the Chamber Hall of Usina del Arte with pianist Oscar De Elía, and presents "Que sea tango" at the Palacio Libertad (former CCK) with De Elía and saxophonist Bernardo Baraj. On April 11, 2026 she performs live on Radio Rivadavia AM 630 on Julio Lagos\'s "La Radio Sos Vos". On August 20, 2025 she premieres "Mujer Tango" at the Tango BA Festival at the Claridge Bar. On September 17, 2025 she globally launches the album "Mujer Tango": nine songs vindicating the female perspective in tango with Afro-Río de la Plata roots and a 21st-century vision.',
    },
    loc6: { es: 'Buenos Aires · Usina del Arte · CCK · Radio Rivadavia', en: 'Buenos Aires · Usina del Arte · CCK · Radio Rivadavia' },
    mastersLabel: { es: 'Formación', en: 'Formation' },
    mastersTitle: {
      es: 'Aprendió de los<br /><em>titanes del género</em>',
      en: 'She learned from<br /><em>the titans of the genre</em>',
    },
    mastersSub: {
      es: 'A diferencia de generaciones posteriores, Mentana se formó in situ, compartiendo escenarios, estudios de grabación y charlas de madrugada con las figuras que definieron la estética del tango en el siglo XX.',
      en: "Unlike later generations, Mentana trained in situ, sharing stages, recording studios and late-night conversations with the figures who defined tango's aesthetic in the 20th century.",
    },
    mastersQuote: {
      es: '«Tuve el privilegio histórico de absorber los "yeites" del tango directamente de quienes los inventaron — la afinación de Pugliese, el fraseo de Goyeneche, la presencia de Nelly Omar.»',
      en: '"I had the historical privilege of absorbing tango\'s \'yeites\' directly from those who invented them — Pugliese\'s tuning, Goyeneche\'s phrasing, Nelly Omar\'s presence."',
    },
    mastersQuoteCite: { es: 'María José Mentana', en: 'María José Mentana' },
    voiceLabel: { es: 'La voz', en: 'The voice' },
    voiceTitle: {
      es: 'Técnica e interpretación:<br /><em>una voz singular</em>',
      en: 'Technique and interpretation:<br /><em>a singular voice</em>',
    },
    voicePara1: {
      es: 'La voz de María José Mentana se caracteriza por sus intensos matices en los registros medios y graves: una cualidad tímbrica aterciopelada y oscura que le permite narrar las tragedias urbanas del tango poético con visceralidad sobrecogedora, sin perder jamás la pureza tímbrica ni la exactitud de su afinación.',
      en: "María José Mentana's voice is characterized by its intense nuances in the middle and lower registers: a velvety, dark timbral quality that allows her to narrate the urban tragedies of poetic tango with overwhelming viscerality, never losing timbral purity or the precision of her pitch.",
    },
    voicePara2: {
      es: 'La crítica especializada destaca de manera unánime su "interpretación profunda y afinada", una amalgama única de la escuela melódica del "bel canto" rioplatense —encarnada por Gardel y Floreal Ruiz— con la violencia desgarradora del expresionismo tanguero moderno heredado directamente de Roberto "Polaco" Goyeneche.',
      en: 'Specialist critics unanimously highlight her "deep and in-tune interpretation", a unique amalgam of the melodic school of Río de la Plata "bel canto" — embodied by Gardel and Floreal Ruiz — with the shattering violence of modern tango expressionism inherited directly from Roberto "Polaco" Goyeneche.',
    },
    voiceTraits: {
      es: [
        'Intensos matices en registros medios y graves',
        'Fraseo prístino con gestión del silencio',
        'Capacidad sinfónica: actúa frente a orquestas de 100 músicos',
        'Dominio del "yeite" — técnica oral no escrita en la partitura',
        'Emisión en tres idiomas: español, japonés, francés',
        'Profunda afinación reconocida por la crítica especializada',
      ],
      en: [
        'Intense nuances in middle and lower registers',
        'Pristine phrasing with masterful use of silence',
        'Symphonic capacity: performs before orchestras of 100 musicians',
        'Command of "yeite" — oral technique unwritten in the score',
        'Vocal delivery in three languages: Spanish, Japanese, French',
        'Deep pitch accuracy recognized by specialist critics',
      ],
    },
    teachLabel: { es: 'Docencia', en: 'Teaching' },
    teachTitle: {
      es: 'La transmisión<br /><em>del saber oral</em>',
      en: 'The transmission<br /><em>of oral knowledge</em>',
    },
    teachSub: {
      es: 'Mentana asume una responsabilidad histórica: garantizar que las técnicas del auténtico tango porteño se transmitan a las nuevas generaciones de intérpretes.',
      en: 'Mentana takes on a historical responsibility: ensuring that the techniques of authentic Buenos Aires tango are transmitted to new generations of performers.',
    },
    teachItems: {
      es: [
        { title: 'Cátedra en la Universidad Nacional de las Artes', text: 'Titular de la cátedra de canto en el Departamento de Artes Musicales y Sonoras de la UNA. Diseña e imparte cursos de extensión universitaria, laboratorios de investigación sonora y talleres de formación práctica intensiva.' },
        { title: 'Clases Magistrales Privadas', text: 'Brinda clases magistrales de historia del tango, técnica vocal de proyección, interpretación dramática del texto poético y armado de repertorio. El conocimiento empírico de quien creció junto a Goyeneche, Federico y Mercedes Simone.' },
        { title: 'Academia Nacional del Tango', text: 'Miembro de número de la Academia Nacional del Tango y la Academia Porteña del Lunfardo. Participa activamente en la preservación del patrimonio inmaterial porteño y la transmisión oral de la tradición.' },
        { title: 'Teatro, Dramaturgia y Producción', text: 'Sus obras "De Buenos Aires a París" (Teatro Maipo, 2013) y "Las Minas de Troilo" (2014) combinan investigación histórica con puesta en escena para rescatar la memoria oral del género.' },
      ],
      en: [
        { title: 'Chair at the National University of the Arts', text: 'Holder of the vocal chair in the Department of Musical and Sound Arts at UNA. Designs and teaches university extension courses, sound research labs and intensive practical training workshops.' },
        { title: 'Private Master Classes', text: "Offers master classes on tango history, vocal projection technique, dramatic interpretation of poetic text and repertoire construction. The empirical knowledge of someone who grew up alongside Goyeneche, Federico and Mercedes Simone." },
        { title: 'National Tango Academy', text: "Full member of the National Tango Academy and the Porteña Lunfardo Academy. Actively participates in the preservation of Buenos Aires's intangible heritage and the oral transmission of tradition." },
        { title: 'Theatre, Dramaturgy and Production', text: 'Her works "De Buenos Aires a París" (Teatro Maipo, 2013) and "Las Minas de Troilo" (2014) combine historical research with staging to rescue the oral memory of the genre.' },
      ],
    },
    closingQuote: {
      es: '«El tango es la bisagra entre generaciones. Mi misión es no dejar que se pierda lo que los grandes maestros me enseñaron en las madrugadas porteñas.»',
      en: '"Tango is the bridge between generations. My mission is to ensure that what the great masters taught me in the Buenos Aires small hours is never lost."',
    },
    closingCite: { es: 'María José Mentana, 2025', en: 'María José Mentana, 2025' },
  },

  // ── Discography ──
  discography: {
    sectionLabel: { es: 'Discografía', en: 'Discography' },
    headingTitle: {
      es: 'Una voz grabada<br /><em>en tres continentes</em>',
      en: 'A voice recorded<br /><em>across three continents</em>',
    },
    headerSub: {
      es: 'Décadas de tango preservadas en vinilo y digital.',
      en: 'Decades of tango preserved on vinyl and digital.',
    },
    latestBadge: { es: 'Último álbum', en: 'Latest album' },
    albums: discographyAlbums,
  },

  // ── Videos ──
  videos: {
    sectionLabel: { es: 'Videos', en: 'Videos' },
    headingTitle: {
      es: 'Actuaciones<br /><em>destacadas</em>',
      en: 'Featured<br /><em>performances</em>',
    },
    headerSub: {
      es: 'Una selección de presentaciones en vivo a lo largo de su carrera.',
      en: 'A selection of live performances throughout her career.',
    },
    playAria:   { es: 'Reproducir:', en: 'Play:'             },
    comingSoon: { es: 'Video próximamente', en: 'Video coming soon' },
    channelBtn: { es: 'Ver canal completo en YouTube', en: 'View full channel on YouTube' },
    list: [
      { id: 'vid-01', title: 'DESENCUENTRO',      subtitle: { es: 'En vivo — Buenos Aires',               en: 'Live — Buenos Aires'                   }, url: 'https://www.youtube.com/watch?v=Fy-czS7-ZUw',                                         placeholder: false },
      { id: 'vid-02', title: 'Naranjo en flor',   subtitle: { es: 'Con Néstor Marconi — Japón 1991',       en: 'With Néstor Marconi — Japan 1991'        }, url: 'https://www.youtube.com/watch?v=93qgQzoVh-c&list=RD93qgQzoVh-c&start_radio=1',       placeholder: false },
      { id: 'vid-03', title: 'Balada para un loco', subtitle: { es: 'Orquesta Sinfónica de Venezuela',   en: 'Symphony Orchestra of Venezuela'         }, url: 'https://www.youtube.com/watch?v=g1inMfDF6fA&list=RDg1inMfDF6fA&start_radio=1',       placeholder: false },
      { id: 'vid-04', title: 'Malena',             subtitle: { es: 'Con Atilio Stampone — CienTroilos',   en: 'With Atilio Stampone — CienTroilos'      }, url: 'https://www.youtube.com/watch?v=U73lsn9s9Cw&list=RDU73lsn9s9Cw&start_radio=1',       placeholder: false },
      { id: 'vid-05', title: 'El Esquinazo',       subtitle: { es: 'Mujer Tango — Café La Humedad 2025', en: 'Tango Woman — Café La Humedad 2025'        }, url: 'https://www.youtube.com/watch?v=12nKKQVq6So&list=RD12nKKQVq6So&start_radio=1',       placeholder: false },
      { id: 'vid-06', title: 'La última curda',    subtitle: { es: 'Homenaje a Troilo',                   en: 'Tribute to Troilo'                       }, url: 'https://www.youtube.com/watch?v=2LuCCaopW94&list=RD2LuCCaopW94&start_radio=1',       placeholder: false },
    ],
  },

  // ── Music ──
  music: {
    sectionLabel: { es: 'Música', en: 'Music' },
    headingTitle: {
      es: 'Escuchá<br /><em>su voz</em>',
      en: 'Listen to<br /><em>her voice</em>',
    },
    headerSub: {
      es: 'Disponible en plataformas digitales.\nUna carrera de más de 55 años, hoy al alcance de todos.',
      en: "Available on digital platforms.\nA career spanning over 55 years, today within everyone's reach.",
    },
    availableOn: { es: 'Disponible en', en: 'Available on' },
    blogText:    { es: 'Blog oficial',   en: 'Official Blog' },
  },

  // ── Gallery ──
  gallery: {
    sectionLabel: { es: 'Galería', en: 'Gallery' },
    headingTitle: {
      es: 'Una vida sobre<br /><em>los escenarios</em>',
      en: 'A life on<br /><em>the stage</em>',
    },
    subtitle: {
      es: '55 años de imágenes. Desde Canal 9 hasta los grandes teatros del mundo.',
      en: '55 years of images. From Canal 9 to the great theaters of the world.',
    },
    count:       { es: 'fotografías',  en: 'photographs'   },
    ariaView:    { es: 'Ver:',         en: 'View:'         },
    prevAria:    { es: 'Anterior',     en: 'Previous'      },
    nextAria:    { es: 'Siguiente',    en: 'Next'          },
    closeAria:   { es: 'Cerrar',       en: 'Close'         },
    imageViewer: { es: 'Visor de imágenes', en: 'Image viewer' },
  },

  // ── Contact ──
  contact: {
    sectionLabel: { es: 'Contacto',                 en: 'Contact'                   },
    heading:      { es: '¿Querés trabajar juntos?', en: 'Want to work together?'    },
    sub: {
      es: 'Para contrataciones, prensa, entrevistas y colaboraciones artísticas.',
      en: 'For bookings, press, interviews and artistic collaborations.',
    },
    emailLabel: { es: 'Email directo', en: 'Direct email' },
    location:   { es: 'Ubicación',    en: 'Location'     },
    social:     { es: 'Redes',        en: 'Socials'      },
    quote: {
      es: '«El tango es la bisagra entre generaciones»',
      en: '"Tango is the bridge between generations"',
    },
    blog: { es: 'Blog oficial', en: 'Official Blog' },
    fields: {
      name:      { es: 'Nombre',         en: 'Name'      },
      namePh:    { es: 'Tu nombre',      en: 'Your name' },
      emailPh:   { es: 'tu@email.com',   en: 'your@email.com' },
      subject:   { es: 'Asunto',         en: 'Subject'   },
      subjectPh: { es: 'Contratación · Prensa · Entrevista · Otro', en: 'Booking · Press · Interview · Other' },
      message:   { es: 'Mensaje',        en: 'Message'   },
      messagePh: { es: 'Contanos sobre tu propuesta...', en: 'Tell us about your proposal...' },
      send:      { es: 'Enviar mensaje', en: 'Send message' },
      sending:   { es: 'Enviando...',    en: 'Sending...'   },
    },
    success: {
      title: { es: 'Mensaje enviado', en: 'Message sent' },
      sub:   { es: 'Gracias por escribir. María José o su equipo te responderán a la brevedad.', en: 'Thank you for writing. María José or her team will reply shortly.' },
      again: { es: 'Enviar otro mensaje', en: 'Send another message' },
    },
  },

  // ── Clases ──
  clases: {
    sectionLabel: { es: 'Clases & Talleres', en: 'Classes & Workshops' },
    headingTitle: {
      es: 'Clases de Canto\u003cbr /\u003e\u003cem\u003econ María José Mentana\u003c/em\u003e',
      en: 'Singing Classes\u003cbr /\u003e\u003cem\u003ewith María José Mentana\u003c/em\u003e',
    },
    headerSub: {
      es: 'Masterclasses y talleres de canto en folklore, tango y géneros argentinos. Transmisión directa de la tradición oral, con más de 55 años de experiencia escénica.',
      en: 'Master classes and singing workshops in folklore, tango and Argentine genres. Direct transmission of oral tradition, with over 55 years of stage experience.',
    },

    genres: [
      {
        title: { es: 'Folklore', en: 'Folklore' },
        desc: {
          es: 'Técnica vocal aplicada al folklore argentino: zamba, chacarera, vidala y más. Respiración, proyección y la identidad rítmica del género.',
          en: 'Vocal technique applied to Argentine folklore: zamba, chacarera, vidala and more. Breathing, projection and the rhythmic identity of the genre.',
        },
      },
      {
        title: { es: 'Tango', en: 'Tango' },
        desc: {
          es: 'El "yeite" tanguero enseñado de primera mano. Fraseo, interpretación dramática del texto poético y construcción de repertorio auténtico.',
          en: 'Tango "yeite" taught first-hand. Phrasing, dramatic interpretation of poetic text and authentic repertoire building.',
        },
      },
      {
        title: { es: 'Géneros Argentinos', en: 'Argentine Genres' },
        desc: {
          es: 'Un recorrido por los géneros urbanos y regionales: milonga, candombe, vals criollo y bolero. Versatilidad con raíz.',
          en: 'A journey through urban and regional genres: milonga, candombe, vals criollo and bolero. Versatility with roots.',
        },
      },
    ],

    scheduleLabel: { es: 'Horarios', en: 'Schedule' },
    scheduleTitle: {
      es: 'Todos los\u003cbr /\u003e\u003cem\u003esábados\u003c/em\u003e',
      en: 'Every\u003cbr /\u003e\u003cem\u003eSaturday\u003c/em\u003e',
    },
    scheduleSub: {
      es: 'Las clases se dictan los sábados por la tarde en dos turnos. Cupos limitados para garantizar la atención personalizada que cada alumno merece.',
      en: 'Classes are held on Saturdays in two shifts. Limited spots to ensure the personalized attention each student deserves.',
    },
    shifts: [
      { time: '11:00 hs', new: false },
      { time: '16:00 hs', new: true  },
    ],
    newShift: { es: 'Nuevo turno', en: 'New shift' },
    studentsLine: { es: '~11 alumnos por turno · grupos reducidos', en: '~11 students per shift · small groups' },
    location:     { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina' },

    badge: {
      title: { es: 'Cupos Limitados', en: 'Limited Spots' },
      text:  {
        es: 'Para garantizar la calidad de la enseñanza y el contacto directo con la maestra, cada turno tiene cupo máximo. ¡Reservá el tuyo!',
        en: 'To guarantee teaching quality and direct contact with the teacher, each shift has a maximum capacity. Reserve yours!',
      },
      pill: { es: '✦ Exclusividad garantizada', en: '✦ Guaranteed exclusivity' },
    },

    ctaLabel: { es: 'Inscripción', en: 'Enrollment' },
    ctaTitle: {
      es: '¿Querés\u003cbr /\u003e\u003cem\u003esumar tu voz?\u003c/em\u003e',
      en: 'Want to\u003cbr /\u003e\u003cem\u003ejoin the class?\u003c/em\u003e',
    },
    ctaSub: {
      es: 'Completá el formulario o escribinos directamente por WhatsApp. Te responderemos a la brevedad con toda la información.',
      en: 'Fill out the form or contact us directly via WhatsApp. We will get back to you promptly with all the information.',
    },
    ctaWhatsApp: { es: 'Consultá por WhatsApp', en: 'Ask via WhatsApp' },

    form: {
      title:            { es: 'Anotate al taller',              en: 'Register for the workshop'          },
      nombre:           { es: 'Nombre',                         en: 'Name'                               },
      turno:            { es: 'Turno preferido',                en: 'Preferred shift'                    },
      turnoPlaceholder: { es: 'Elegí un turno',                 en: 'Choose a shift'                     },
      turnoManana:      { es: 'Turno mañana — 11:00 hs',       en: 'Morning shift — 11:00 am'           },
      turnoTarde:       { es: 'Turno tarde — 16:00 hs',        en: 'Afternoon shift — 4:00 pm'          },
      turnoAmbos:       { es: 'Ambos (tengo flexibilidad)',     en: 'Either (I am flexible)'             },
      mensaje:          { es: 'Contanos sobre vos (opcional)',  en: 'Tell us about yourself (optional)'  },
      send:             { es: 'Reservar mi lugar',              en: 'Reserve my spot'                    },
      sending:          { es: 'Enviando...',                    en: 'Sending...'                         },
      successTitle:     { es: '¡Recibimos tu consulta!',       en: 'We received your inquiry!'          },
      successSub:       { es: 'María José o su equipo te escribirán a la brevedad con la información del taller.', en: 'María José or her team will contact you shortly with workshop details.' },
      again:            { es: 'Enviar otra consulta',          en: 'Send another inquiry'               },
      error:            { es: 'Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.', en: 'There was an error. Please try again or contact us via WhatsApp.' },
    },
  },

  // ── Footer ──
  footer: {
    tagline: {
      es: 'Cantante de Tango · Personalidad Destacada de la Cultura',
      en: 'Tango Singer · Outstanding Cultural Personality',
    },
    sections: { es: 'Secciones', en: 'Sections' },
    contact:  { es: 'Contacto',  en: 'Contact'  },
    links: [
      { es: 'Discografía', en: 'Discography', to: '/discografia' },
      { es: 'Biografía',   en: 'Biography',   to: '/biografia'   },
      { es: 'Galería',     en: 'Gallery',     to: '/galeria'     },
      { es: 'Clases',      en: 'Classes',     to: '/clases'      },
      { es: 'Contacto',    en: 'Contact',     to: '/contacto'    },
    ],
    copy:    { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    backTop: { es: '↑ Volver arriba', en: '↑ Back to top' },
  },
}
