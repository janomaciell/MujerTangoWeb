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
      es: 'La Artista',
      en: 'The Artist',
    },
    heroSub: {
      es: 'Rosana Inés Mentana — una vida entera con la música.',
      en: 'Rosana Inés Mentana — a lifetime dedicated to music.',
    },
    bornLabel: { es: 'Fecha de nacimiento', en: 'Date of birth' },
    stats: {
      years:      { es: 'años de carrera',    en: 'years of career'    },
      continents: { es: 'continentes',        en: 'continents'         },
      concerts:   { es: 'conciertos en Asia', en: 'concerts in Asia'   },
      albums:     { es: 'álbumes grabados',   en: 'albums recorded'    },
    },
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
    heading:      { es: 'Descubrí tu voz',            en: 'Find your voice'           },
    sub: {
      es: 'Encontrá tu lugar en el mundo a través de la música y el canto.',
      en: 'Find your place in the world through music and singing.',
    },
    emailLabel: { es: 'Email directo',               en: 'Direct email'                },
    location:   { es: 'Ubicación',                    en: 'Location'                    },
    social:     { es: 'Redes',                        en: 'Socials'                     },
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
    title: {
      es: 'MJEstudio — Clases de Canto',
      en: 'MJEstudio — Singing Classes',
    },
    subtitle: {
      es: 'Cantar no es solo afinar. Es encontrarte.',
      en: 'Singing is not just about staying in tune. It is about finding yourself.',
    },
    intro1: {
      es: 'Hay algo en la voz que no se escribe en ningún manual. Se aprende escuchando, sintiendo, viviendo. Eso es lo que enseño: los yeites, la intención, el propósito detrás de cada nota.',
      en: 'There is something in the voice that is not written in any manual. It is learned by listening, feeling, living. That is what I teach: the secrets, the intention, the purpose behind each note.',
    },
    intro2: {
      es: 'Lo que aprendí de los grandes referentes, ahora te lo transmito a vos.',
      en: 'What I learned from the great legends, now I pass it on to you.',
    },
    offerTitle: {
      es: '¿Qué ofrezco en MJEstudio?',
      en: 'What do I offer at MJEstudio?',
    },
    offers: [
      {
        title: { es: 'Clases individuales presenciales', en: 'In-person individual classes' },
        desc: { es: 'Trabajo personalizado, a tu ritmo y con tu voz.', en: 'Personalized work, at your own pace and with your voice.' }
      },
      {
        title: { es: 'Clases online', en: 'Online classes' },
        desc: { es: 'La misma calidad, desde donde estés.', en: 'The same quality, from wherever you are.' }
      },
      {
        title: { es: 'Master Class', en: 'Master Class' },
        desc: { es: 'Una experiencia intensiva para dar el salto que necesitás.', en: 'An intensive experience to take the leap you need.' }
      },
      {
        title: { es: 'Talleres', en: 'Workshops' },
        desc: { es: 'Aprendizaje colectivo, creativo y transformador.', en: 'Collective, creative and transformative learning.' }
      }
    ],
    audience1: {
      es: 'Para principiantes, intermedios y cantantes con experiencia.',
      en: 'For beginners, intermediate and experienced singers.',
    },
    audience2: {
      es: 'Para quienes quieren potenciar su canto, y también para quienes quieren cantar por primera vez.',
      en: 'For those who want to boost their singing, and also for those who want to sing for the first time.',
    },
    closing1: {
      es: 'Cantar es expresarte en plenitud.',
      en: 'Singing is expressing yourself in full.',
    },
    closing2: {
      es: 'Y eso es lo que haremos juntos.',
      en: 'And that is what we will do together.',
    },
    reserveLabel: {
      es: 'Reservá tu lugar —',
      en: 'Book your spot —',
    },
    contactLink: { es: 'Contacto', en: 'Contact' },
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
