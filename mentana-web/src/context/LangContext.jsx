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
        es: 'María José Mentana es una de las grandes voces del tango argentino contemporáneo. Con más de cinco décadas de trayectoria, inició su carrera a los nueve años en Grandes Valores del Tango y construyó un camino artístico que la llevó a compartir escenarios y proyectos con figuras emblemáticas como Tita Merello, Nelly Omar, Mariano Mores, Leopoldo Federico, Raúl Garello, Horacio Ferrer, Jairo, Rubén Juárez y Mercedes Sosa, por nombrar algunos.',
        en: 'María José Mentana is one of the great voices of contemporary Argentine tango. With a career spanning over five decades, she began at the age of nine on Grandes Valores del Tango and forged an artistic path that led her to share stages and projects with legendary figures such as Tita Merello, Nelly Omar, Mariano Mores, Leopoldo Federico, Raúl Garello, Horacio Ferrer, Jairo, Rubén Juárez, and Mercedes Sosa, to name a few.',
      },
      {
        es: 'Su arte ha recorrido los principales escenarios de Europa, Asia y Latinoamérica, consolidando una interpretación reconocida por su profundidad expresiva, elegancia y autenticidad. La crítica la ha definido como una artista de “voz de intensos matices” y una de las intérpretes más personales del tango de las últimas décadas.',
        en: 'Her art has traveled the main stages of Europe, Asia, and Latin America, establishing a style recognized for its expressive depth, elegance, and authenticity. Critics have defined her as an artist with a "voice of intense nuances" and one of the most personal performers of tango in recent decades.',
      },
      {
        es: 'Distinguida como Personalidad Destacada de la Cultura por la Ciudad de Buenos Aires, Académica Titular de la Academia Nacional del Tango y nominada a los Premios Gardel, ha desarrollado además una destacada labor como creadora, productora y difusora de la cultura tanguera.',
        en: 'Honoured as an Outstanding Cultural Personality by the City of Buenos Aires, a Full Member of the National Academy of Tango, and nominated for the Gardel Awards, she has also developed a notable career as a creator, producer, and promoter of tango culture.',
      },
      {
        es: 'Actualmente continúa presentándose junto a importantes orquestas sinfónicas y llevando el tango a nuevos públicos. Su más reciente trabajo discográfico, Mujer Tango (EPSA Music), reafirma una mirada artística que enlaza tradición y contemporaneidad, consolidando la vigencia de una intérprete fundamental de la música argentina.',
        en: 'Currently, she continues to perform alongside major symphony orchestras and bring tango to new audiences. Her most recent album, Mujer Tango (EPSA Music), reaffirms an artistic vision that links tradition and modernity, consolidating the relevance of a fundamental figure in Argentine music.',
      },
    ],
    yearsLabel: { es: 'años de\nexperiencia', en: 'years of\nexperience' },
    quote: {
      una: { es: 'Una', en: 'A' },
      rest: {
        es: 'Una pasión que se hace canto, tejiendo la historia del tango con la fuerza del alma.',
        en: 'passion turned into song, weaving the history of tango with the strength of the soul.',
      },
      emphasis: {
        es: 'fuerza del alma',
        en: 'strength of the soul',
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
    distinctions: { es: 'Distinciones', en: 'Distinctions' },
    actedWith:    { es: 'Actuó junto a',          en: 'Performed alongside'   },
    stats: {
      years:      { es: 'años de carrera',  en: 'years of career' },
      continents: { es: 'continentes',      en: 'continents'      },
      cities:     { es: 'ciudades en Asia', en: 'cities in Asia'  },
    },
    dists: [
      { es: 'Personalidad Destacada de la Cultura',        en: 'Outstanding Cultural Personality'     },
      { es: 'Académica de la Academia Nacional del Tango', en: 'Member of the National Tango Academy' },
    ],
    orgs: [
      { es: 'Ciudad de Buenos Aires',       en: 'City of Buenos Aires'    },
      { es: 'Academia Nacional del Tango',  en: 'National Tango Academy'  },
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
          es: 'María José Mentana nace el 31 de enero en San Isidro, Buenos Aires. Desde pequeña canta en los clubes de su barrio, descubriendo una voz que el tango reclamaría para siempre.',
          en: 'María José Mentana is born on January 31 in San Isidro, Buenos Aires. Since childhood she sings in the clubs of her neighborhood, discovering a voice that tango would claim forever.',
        },
        detail: { es: 'San Isidro, Buenos Aires', en: 'San Isidro, Buenos Aires' },
      },
      {
        year: '1970',
        era:   { es: 'La revelación',   en: 'The revelation'   },
        title: { es: 'La Niña Prodigio', en: 'The Child Prodigy' },
        text: {
          es: 'A los nueve años debuta en "Grandes Valores del Tango" de Canal 9, conducido por Juan Carlos Thorry. La crítica la bautiza: "La Niña Prodigio". Comparte escenario con Pugliese, Tita Merello.',
          en: 'At age nine she debuts on "Grandes Valores del Tango" on Canal 9, hosted by Juan Carlos Thorry. Critics dub her "The Child Prodigy". She shares the stage with Pugliese, Tita Merello.',
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
      es: 'Una voz que<br />atravesó continentes',
      en: 'A voice that<br />crossed continents',
    },
    heroSub: {
      es: 'La trayectoria de una de las grandes voces del tango argentino contemporáneo.',
      en: 'The career of one of the great voices of contemporary Argentine tango.',
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

  // ── Contrataciones ──
  clases: {
    title: {
      es: 'Contrataciones',
      en: 'Bookings & Shows',
    },
    subtitle: {
      es: 'Llevá la voz del tango de María José Mentana a tu escenario, festival o evento.',
      en: 'Bring the tango voice of María José Mentana to your stage, festival, or event.',
    },
    intro1: {
      es: 'Con más de 55 años de trayectoria internacional, María José Mentana ofrece espectáculos de tango de primer nivel, combinando emoción, técnica impecable y la fuerza expresiva de una de las grandes voces del género.',
      en: 'With over 55 years of international career, María José Mentana delivers top-tier tango shows, combining emotion, flawless technique, and the expressive force of one of the genre\'s greatest voices.',
    },
    intro2: {
      es: 'Disponible para conciertos, festivales, eventos privados, presentaciones corporativas y seminarios magistrales en Argentina y el mundo.',
      en: 'Available for concerts, festivals, private events, corporate performances, and master seminars in Argentina and worldwide.',
    },
    offerTitle: {
      es: 'Propuestas de Contratación',
      en: 'Booking Options',
    },
    offers: [
      {
        title: { es: 'Conciertos y Festivales', en: 'Concerts & Festivals' },
        desc: { es: 'Shows en vivo con repertorio de tango clásico y contemporáneo.', en: 'Live shows featuring classic and contemporary tango repertoire.' }
      },
      {
        title: { es: 'Eventos Privados y Corporativos', en: 'Private & Corporate Events' },
        desc: { es: 'Presentaciones exclusivas adaptadas a la medida de tu evento.', en: 'Exclusive performances tailored to your event.' }
      },
      {
        title: { es: 'Master Class & Formación Vocal', en: 'Master Classes & Vocal Seminars' },
        desc: { es: 'Encuentros intensivos de perfeccionamiento técnico e interpretativo.', en: 'Intensive technical and interpretative training sessions.' }
      },
      {
        title: { es: 'Giras Internacionales', en: 'International Tours' },
        desc: { es: 'Presentaciones teatrales y espectáculos internacionales.', en: 'Theater performances and international shows.' }
      }
    ],
    audience1: {
      es: 'Para productores, festivales, teatros y organizadores de eventos.',
      en: 'For producers, festivals, theaters, and event organizers.',
    },
    audience2: {
      es: 'Para quienes buscan un espectáculo de tango inolvidable y de jerarquía internacional.',
      en: 'For those seeking an unforgettable tango show of international caliber.',
    },
    closing1: {
      es: 'El tango es emoción en estado puro.',
      en: 'Tango is pure emotion.',
    },
    closing2: {
      es: 'Hacé de tu próximo evento una experiencia inolvidable.',
      en: 'Make your next event an unforgettable experience.',
    },
    reserveLabel: {
      es: 'Consultá por contrataciones —',
      en: 'Inquire for bookings —',
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
      { es: 'Biografía',   en: 'Biography',   to: '/biografia'   },
      { es: 'Galería',     en: 'Gallery',     to: '/galeria'     },
      { es: 'Discografía', en: 'Discography', to: '/discografia' },
      { es: 'Contrataciones', en: 'Bookings', to: '/clases'      },
      { es: 'Contacto',    en: 'Contact',     to: '/contacto'    },
    ],
    copy:    { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    backTop: { es: '↑ Volver arriba', en: '↑ Back to top' },
  },
}
