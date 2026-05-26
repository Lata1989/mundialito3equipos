export interface QuestionItem {
  country: string;
  question: string;
  answer: string;
  options: string[];
}

export const QUESTIONS_DB: QuestionItem[] = [
  // ==========================================
  // ARGENTINA (ARG)
  // ==========================================
  {
    country: "Argentina",
    question: "ARG-1 | ¿En qué ciudad se encuentra el famoso Obelisco?",
    answer: "buenos aires",
    options: ["Mendoza", "Córdoba", "Buenos Aires", "Rosario"],
  },
  {
    country: "Argentina",
    question: "ARG-2 | ¿Cuál es el apodo de la camiseta argentina?",
    answer: "la albiceleste",
    options: ["La Roja", "La Albiceleste", "La Verde", "La Celeste"],
  },
  {
    country: "Argentina",
    question: "ARG-3 | ¿En qué estadio Argentina ganó su primer Mundial en 1978?",
    answer: "estadio monumental",
    options: ["Estadio José Amalfitani", "Estadio Monumental", "Estadio Gigante de Arroyito", "Estadio Mario Kempes"],
  },
  {
    country: "Argentina",
    question: "ARG-4 | ¿Quién convirtió el primer gol de Argentina en el Mundial de 1986?",
    answer: "josé luis brown",
    options: ["Diego Maradona", "Jorge Valdano", "Oscar Ruggeri", "José Luis Brown"],
  },
  {
    country: "Argentina",
    question: "ARG-5 | ¿Cuál fue el único Mundial en el que Argentina defendió el título como campeón vigente?",
    answer: "italia 1990",
    options: ["México 1986", "Italia 1990", "Francia 1998", "Sudáfrica 2010"],
  },
  {
    country: "Argentina",
    question: "ARG-6 | ¿Quién hizo el gol de Argentina en la final del Mundial 2014?",
    answer: "ningún argentino convirtió",
    options: ["Lionel Messi", "Gonzalo Higuaín", "Sergio Agüero", "Ningún argentino convirtió"],
  },
  {
    country: "Argentina",
    question: "ARG-7 | ¿Contra qué país debutó Lionel Messi en un Mundial?",
    answer: "serbia y montenegro",
    options: ["Costa de Marfil", "Serbia y Montenegro", "Alemania", "Países Bajos"],
  },
  {
    country: "Argentina",
    question: "ARG-8 | ¿Qué arquero argentino fue figura en la tanda de penales contra Países Bajos en Qatar 2022?",
    answer: "emiliano martínez",
    options: ["Sergio Romero", "Franco Armani", "Emiliano Martínez", "Gerónimo Rulli"],
  },
  {
    country: "Argentina",
    question: "ARG-9 | ¿Cuál de estos jugadores NO fue campeón mundial con Argentina en 2022?",
    answer: "giovani lo celso",
    options: ["Ángel Di María", "Paulo Dybala", "Giovani Lo Celso", "Julián Álvarez"],
  },
  {
    country: "Argentina",
    question: "ARG-10 | ¿Cuántos goles tiene Messi en mundiales hasta el 2022?",
    answer: "13 goles",
    options: ["10 goles", "11 goles", "12 goles", "13 goles"],
  },
  {
    country: "Argentina",
    question: "ARG-11 | Messi tiene 13 goles en los mundiales hasta 2022, ¿cuántos de ellos hizo de penal?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    country: "Argentina",
    question: "ARG-12 | ¿Cuántas asistencias tiene Messi en los mundiales hasta el 2022?",
    answer: "8 asistencias",
    options: ["5 asistencias", "6 asistencias", "7 asistencias", "8 asistencias"],
  },
  {
    country: "Argentina",
    question: "ARG-13 | ¿En qué mundial le atajaron el primer penal a Messi (tiempo regular)?",
    answer: "rusia 2018",
    options: ["Sudáfrica 2010", "Brasil 2014", "Rusia 2018", "Qatar 2022"],
  },
  {
    country: "Argentina",
    question: "ARG-14 | ¿Quién metió el gol del 2-1 final contra Nigeria en el Mundial 2018?",
    answer: "marcos rojo",
    options: ["Marcos Rojo", "Lionel Messi", "Sergio Agüero", "Ángel Di María"],
  },
  {
    country: "Argentina",
    question: "ARG-15 | ¿Qué ocurrió el 25 de Mayo de 1810?",
    answer: "se formó la primera junta",
    options: ["Se declaró la independencia", "Asumió el primer presidente", "Se formó la Primera Junta", "Se sancionó la Constitución"],
  },
  {
    country: "Argentina",
    question: "ARG-16 | ¿En qué provincia se declaró la Independencia Argentina?",
    answer: "tucumán",
    options: ["Córdoba", "Buenos Aires", "Mendoza", "Tucumán"],
  },
  {
    country: "Argentina",
    question: "ARG-17 | ¿Quién fue el director supremo de las Provincias Unidas y organizó el Congreso de Tucumán?",
    answer: "juan martín de pueyrredón",
    options: ["Manuel Belgrano", "Gervasio Posadas", "Juan Martín de Pueyrredón", "Bernardino Rivadavia"],
  },
  {
    country: "Argentina",
    question: "ARG-18 | ¿Cuál fue el nombre original de Argentina en la época colonial?",
    answer: "virreinato del río de la plata",
    options: ["Virreinato del Río de la Plata", "Provincias Unidas del Sur", "Confederación Argentina", "República Federal del Plata"],
  },
  {
    country: "Argentina",
    question: "ARG-19 | ¿Quién creó la bandera argentina?",
    answer: "manuel belgrano",
    options: ["José de San Martín", "Manuel Belgrano", "Mariano Moreno", "Domingo Sarmiento"],
  },
  {
    country: "Argentina",
    question: "ARG-20 | ¿En qué batalla fue derrotado definitivamente Juan Manuel de Rosas?",
    answer: "caseros",
    options: ["Cepeda", "Pavón", "Caseros", "San Lorenzo"],
  },
  {
    country: "Argentina",
    question: "ARG-21 | ¿Cuál fue el primer presidente de las Provincias Unidas del Río de la Plata (considerado primer presidente histórico)?",
    answer: "bernardino rivadavia",
    options: ["Julio A. Roca", "Bartolomé Mitre", "Bernardino Rivadavia", "Nicolás Avellaneda"],
  },
  {
    country: "Argentina",
    question: "ARG-22 | ¿Cuál es la provincia argentina con mayor superficie?",
    answer: "buenos aires",
    options: ["Buenos Aires", "Chubut", "Santa Cruz", "Mendoza"],
  },
  {
    country: "Argentina",
    question: "ARG-23 | ¿Qué río sirve de límite natural entre Argentina y Uruguay?",
    answer: "río uruguay",
    options: ["Río Paraná", "Río Uruguay", "Río Salado", "Río Pilcomayo"],
  },
  {
    country: "Argentina",
    question: "ARG-24 | ¿Cuál es la capital de la provincia de Tierra del Fuego?",
    answer: "ushuaia",
    options: ["Río Grande", "Tolhuin", "Ushuaia", "Caleta Olivia"],
  },
  {
    country: "Argentina",
    question: "ARG-25 | ¿Qué provincia argentina NO tiene salida al mar?",
    answer: "neuquén",
    options: ["Río Negro", "Chubut", "Neuquén", "Santa Cruz"],
  },
  {
    country: "Argentina",
    question: "ARG-26 | ¿Cuál es el cerro más alto de América?",
    answer: "aconcagua",
    options: ["Lanín", "Fitz Roy", "Mercedario", "Aconcagua"],
  },
  {
    country: "Argentina",
    question: "ARG-27 | ¿En qué provincia se encuentran las Cataratas del Iguazú?",
    answer: "misiones",
    options: ["Corrientes", "Chaco", "Misiones", "Formosa"],
  },
  {
    country: "Argentina",
    question: "ARG-28 | ¿Cuál es el lago más grande que se encuentra completamente dentro del territorio de Argentina?",
    answer: "lago argentino",
    options: ["Lago Nahuel Huapi", "Lago Argentino", "Lago Viedma", "Lago Fagnano"],
  },
  {
    country: "Argentina",
    question: "ARG-29 | ¿Qué provincia argentina limita con más países?",
    answer: "salta",
    options: ["Salta", "Jujuy", "Misiones", "Mendoza"],
  },
  {
    country: "Argentina",
    question: "ARG-30 | ¿Cuál es la ciudad más austral del mundo reconocida oficialmente?",
    answer: "ushuaia",
    options: ["Río Gallegos", "Punta Arenas", "Ushuaia", "Puerto Madryn"],
  },
  {
    country: "Argentina",
    question: "ARG-31 | ¿Qué provincia argentina produce mayor cantidad de vino?",
    answer: "mendoza",
    options: ["San Juan", "Mendoza", "La Rioja", "Neuquén"],
  },

  // ==========================================
  // COLOMBIA (COL)
  // ==========================================
  {
    country: "Colombia",
    question: "COL-1 | ¿Cuál es la Flor Nacional de Colombia?",
    answer: "la orquídea",
    options: ["La Rosa", "La Orquídea", "El clavel"],
  },
  {
    country: "Colombia",
    question: "COL-2 | ¿A qué ciudad se le conoce como 'La ciudad de la eterna primavera'?",
    answer: "medellín",
    options: ["Medellín", "Cartagena", "Bogotá"],
  },
  {
    country: "Colombia",
    question: "COL-3 | ¿Cuáles son los dos grandes cuerpos de agua que bañan las costas de Colombia?",
    answer: "océano pacífico y atlántico (mar caribe)",
    options: ["Océano Pacífico y Atlántico (mar Caribe)", "Océano Atlántico (mar Caribe) y Mar Rojo", "Océano Pacífico y Océano Índico"],
  },
  {
    country: "Colombia",
    question: "COL-4 | ¿Cuál es el Árbol nacional de Colombia?",
    answer: "palma de cera",
    options: ["El Roble", "El Cedro", "Palma de Cera"],
  },
  {
    country: "Colombia",
    question: "COL-5 | ¿Quién es el autor de la Novela 'Cien años de soledad'?",
    answer: "gabriel garcía márquez",
    options: ["Álvaro Mutis", "Gabriel García Márquez", "Mario Vargas Llosa"],
  },
  {
    country: "Colombia",
    question: "COL-6 | ¿Cómo se compone la división política de Colombia?",
    answer: "1 distrito capital y 32 departamentos",
    options: ["1 distrito capital y 42 departamentos", "1 distrito capital y 30 departamentos", "1 distrito capital y 32 departamentos"],
  },
  {
    country: "Colombia",
    question: "COL-7 | ¿Cuál es el deporte nacional por ley en Colombia?",
    answer: "tejo",
    options: ["Tejo", "Ciclismo", "Fútbol"],
  },
  {
    country: "Colombia",
    question: "COL-8 | ¿En qué año ganó la selección de Fútbol Masculino de Colombia su primera Copa América?",
    answer: "2001",
    options: ["1993", "2001", "2014"],
  },
  {
    country: "Colombia",
    question: "COL-9 | ¿A qué selección derrotó Colombia con el histórico marcador de 5-0 en las eliminatorias al Mundial de 1994?",
    answer: "argentina",
    options: ["Argentina", "Brasil", "Chile"],
  },
  {
    country: "Colombia",
    question: "COL-10 | ¿Quién es el jugador con más partidos disputados en la historia de la Copa América representando a Colombia?",
    answer: "carlos el pibe valderrama",
    options: ["James Rodríguez", "Carlos el pibe Valderrama", "Radamel Falcao"],
  },
  {
    country: "Colombia",
    question: "COL-11 | ¿Quién es actualmente el máximo goleador histórico de la Selección Colombia masculina de mayores?",
    answer: "radamel falcao",
    options: ["Luis Díaz", "James Rodríguez", "Radamel Falcao"],
  },
  {
    country: "Colombia",
    question: "COL-12 | ¿Con qué países compartió grupo en el Mundial 2014 Colombia?",
    answer: "grecia - costa de marfil - japón",
    options: ["Grecia - Costa de Marfil - Japón", "Grecia - Ghana - EEUU", "Holanda - Costa de Marfil - Japón"],
  },
  {
    country: "Colombia",
    question: "COL-13 | ¿Qué representa el color amarillo en la bandera de Colombia?",
    answer: "la riqueza del suelo, el sol y la soberanía",
    options: ["Los dos océanos que bañan sus costas", "La riqueza del suelo, el sol y la soberanía", "La paz y la Justicia"],
  },
  {
    country: "Colombia",
    question: "COL-14 | ¿En qué grupo participó en el Mundial de Rusia 2018?",
    answer: "h",
    options: ["A", "D", "H"],
  },
  {
    country: "Colombia",
    question: "COL-15 | ¿Quién es el actual presidente de Colombia?",
    answer: "gustavo petro urrego",
    options: ["Gustavo Petro Uribe", "Gustavo Petro Urrego", "Gustavo Petro Quinteros"],
  },
  {
    country: "Colombia",
    question: "COL-16 | ¿Contra qué país quedó eliminado en el Mundial 2018?",
    answer: "inglaterra",
    options: ["Holanda", "Francia", "Inglaterra"],
  },
  {
    country: "Colombia",
    question: "COL-17 | ¿Cuál es la marca actual de la camiseta de Colombia?",
    answer: "adidas",
    options: ["Puma", "Adidas", "Nike"],
  },
  {
    country: "Colombia",
    question: "COL-18 | ¿Cuál es el río más largo de Colombia?",
    answer: "río magdalena",
    options: ["Río Cauca", "Río Putumayo", "Río Magdalena"],
  },
  {
    country: "Colombia",
    question: "COL-19 | ¿En qué ciudad colombiana nació el famoso pintor Fernando Botero?",
    answer: "medellín",
    options: ["Medellín", "Cali", "Bogotá"],
  },
  {
    country: "Colombia",
    question: "COL-20 | ¿Quién fue el primer presidente de la República de la Gran Colombia en 1819?",
    answer: "simón bolívar",
    options: ["Antonio Nariño", "Simón Bolívar", "Rafael Núñez"],
  },
  {
    country: "Colombia",
    question: "COL-21 | ¿Cuál es el sistema montañoso que atraviesa Colombia y se divide en tres cordilleras al entrar al país?",
    answer: "cordillera de los andes",
    options: ["Cordillera de los Andes", "Cordillera de los Alpes", "Montes de María"],
  },
  {
    country: "Colombia",
    question: "COL-22 | ¿Cuál es el ave nacional de Colombia, que también aparece en el escudo del país?",
    answer: "el cóndor de los andes",
    options: ["El flamenco", "El águila Arpía", "El cóndor de los Andes"],
  },
  {
    country: "Colombia",
    question: "COL-23 | ¿Cómo se le llama a la bebida fermentada a base de maíz que era sagrada para los indígenas y aún se consume en el centro del país?",
    answer: "chicha",
    options: ["Aguardiente", "Chicha", "Canelazo"],
  },
  {
    country: "Colombia",
    question: "COL-24 | ¿Cuál es el instrumento nacional de Colombia?",
    answer: "tiple",
    options: ["El Ukelele", "El Cuatro", "Tiple"],
  },
  {
    country: "Colombia",
    question: "COL-25 | ¿Quién es el actual director técnico de la Selección Colombia?",
    answer: "néstor lorenzo",
    options: ["Néstor Lorenzo", "José Pékerman", "Reinaldo Rueda"],
  },
  {
    country: "Colombia",
    question: "COL-26 | ¿Cuál es la capital de Colombia?",
    answer: "bogotá",
    options: ["Cartagena", "Bogotá", "Medellín"],
  },
  {
    country: "Colombia",
    question: "COL-27 | ¿En qué zona de Colombia crecen las palmeras de cera, las más altas del mundo?",
    answer: "el valle de cocora",
    options: ["El Valle de Cocora", "La selva Amazónica", "La sierra nevada de Santa Marta"],
  },
  {
    country: "Colombia",
    question: "COL-28 | ¿Qué línea imaginaria pasa por el extremo sur de Colombia?",
    answer: "línea del ecuador",
    options: ["Meridiano de Greenwich", "Trópico de Cáncer", "Línea del Ecuador"],
  },
  {
    country: "Colombia",
    question: "COL-29 | ¿De cuántos mundiales participó la Selección de Colombia?",
    answer: "6",
    options: ["5", "6", "4"],
  },
  {
    country: "Colombia",
    question: "COL-30 | ¿Cuál fue la primer Copa del Mundo de la que participó la Selección Colombiana?",
    answer: "1962",
    options: ["1962", "1990", "1994"],
  },
  {
    country: "Colombia",
    question: "COL-31 | ¿Cuántas copas del mundo ganó la Selección de Colombia?",
    answer: "0",
    options: ["1", "0", "2"],
  },
  {
    country: "Colombia",
    question: "COL-32 | ¿Cuál es el mejor puesto que logró la Selección Colombiana de Fútbol Masculino en un mundial?",
    answer: "5to lugar",
    options: ["3er Lugar", "7mo Lugar", "5to Lugar"],
  },

  // ==========================================
  // JAPÓN (JPN)
  // ==========================================
  {
    country: "Japón",
    question: "JPN-1 | ¿Colores que componen la bandera de Japón?",
    answer: "blanco y rojo",
    options: ["Blanco, Rojo y Negro", "Rosa y Blanco", "Blanco y Rojo"],
  },
  {
    country: "Japón",
    question: "JPN-2 | ¿Cuál es la montaña más alta y emblemática de Japón?",
    answer: "monte fuji",
    options: ["Monte Takao", "Monte Aso", "Monte Fuji"],
  },
  {
    country: "Japón",
    question: "JPN-3 | ¿Cómo se llamaban los guerreros de la antigua nobleza militar de Japón?",
    answer: "samurái",
    options: ["Samurái", "Ninja", "Ronin"],
  },
  {
    country: "Japón",
    question: "JPN-4 | ¿Cuál es la moneda oficial de Japón?",
    answer: "yen",
    options: ["Won", "Yuan", "Yen"],
  },
  {
    country: "Japón",
    question: "JPN-5 | El arte japonés de doblar papel para formar figuras se conoce como:",
    answer: "origami",
    options: ["Bonsái", "Origami", "Haiku"],
  },
  {
    country: "Japón",
    question: "JPN-6 | ¿Cuál es la capital de Japón?",
    answer: "tokio",
    options: ["Tokio", "Osaka", "Kioto"],
  },
  {
    country: "Japón",
    question: "JPN-7 | ¿Cuál es la flor nacional oficial y emblema de la familia Imperial de Japón?",
    answer: "crisantemo (kiku)",
    options: ["Cerezo", "Crisantemo (Kiku)", "Rosa"],
  },
  {
    country: "Japón",
    question: "JPN-8 | ¿En qué grupo participó en el Mundial 2014?",
    answer: "c",
    options: ["A", "F", "C"],
  },
  {
    country: "Japón",
    question: "JPN-9 | ¿Contra qué país quedó eliminado en el Mundial 2022?",
    answer: "croacia",
    options: ["Croacia", "Holanda", "Francia"],
  },
  {
    country: "Japón",
    question: "JPN-10 | ¿Contra qué país disputará su primer partido en el Mundial 2026?",
    answer: "países bajos (holanda)",
    options: ["Túnez", "Suecia", "Países Bajos (Holanda)"],
  },
  {
    country: "Japón",
    question: "JPN-11 | ¿Quién es el entrenador actual de Japón?",
    answer: "hajime moriyasu",
    options: ["Hajime Moriyasu", "Renn Moriyasu", "Masao Moriyasu"],
  },
  {
    country: "Japón",
    question: "JPN-12 | ¿Cuál es la marca de la camiseta de Japón?",
    answer: "adidas",
    options: ["Puma", "Nike", "Adidas"],
  },
  {
    country: "Japón",
    question: "JPN-13 | ¿Con qué países compartió el grupo E en el Mundial 2010?",
    answer: "dinamarca, holanda y camerún",
    options: ["Holanda, suecia, camerun", "Dinamarca, Holanda y Camerún", "Uruguay, Nigeria, Dinamarca"],
  },
  {
    country: "Japón",
    question: "JPN-14 | ¿Cuántas copas del Mundo ganó la selección de Japón?",
    answer: "0",
    options: ["0", "1", "2"],
  },
  {
    country: "Japón",
    question: "JPN-15 | ¿Cuál fue la instancia más importante que logró Japón en una Copa del Mundo?",
    answer: "8vos de final",
    options: ["4tos de Final", "8vos de Final", "Semifinal"],
  },
  {
    country: "Japón",
    question: "JPN-16 | ¿De cuántas copas del mundo participó la Selección de Japón?",
    answer: "7",
    options: ["8", "7", "6"],
  },
  {
    country: "Japón",
    question: "JPN-17 | ¿En qué año clasificó por primera vez la Selección de Japón a una Copa del Mundo?",
    answer: "1998",
    options: ["1970", "1994", "1998"],
  },
  {
    country: "Japón",
    question: "JPN-18 | ¿Quién es el Capitán de la Selección de Japón?",
    answer: "wataru endo",
    options: ["Wataru Endo", "Takumi Minamino", "Maya Yoshida"],
  },
  {
    country: "Japón",
    question: "JPN-19 | ¿Contra qué equipo perdió Japón en los octavos de final de la Copa Mundial 2002?",
    answer: "turquía",
    options: ["México", "Turquía", "EEUU"],
  },
  {
    country: "Japón",
    question: "JPN-20 | ¿Cuántas islas principales forman aproximadamente el territorio japonés?",
    answer: "5",
    options: ["3", "4", "5"],
  },
  {
    country: "Japón",
    question: "JPN-21 | ¿Qué acción se considera de mala educación en público en Japón?",
    answer: "sonarse la nariz",
    options: ["Sonarse la Nariz", "Usar Lentes de Sol", "Leer el periódico"],
  },
  {
    country: "Japón",
    question: "JPN-22 | ¿Cómo se llama el tren bala japonés?",
    answer: "shinkansen",
    options: ["Maglev", "Shinkansen", "Yamato"],
  },
  {
    country: "Japón",
    question: "JPN-23 | ¿Qué ciudad japonesa fue destruida por una bomba atómica en 1945 junto con Nagasaki?",
    answer: "hiroshima",
    options: ["Hiroshima", "Osaka", "Kyoto"],
  },
  {
    country: "Japón",
    question: "JPN-24 | ¿Cuál es el deporte nacional tradicional de Japón?",
    answer: "sumo",
    options: ["Karate", "Judo", "Sumo"],
  },
  {
    country: "Japón",
    question: "JPN-25 | ¿Qué océano baña las costas de Japón?",
    answer: "pacífico",
    options: ["Índico", "Pacífico", "Atlántico"],
  },
  {
    country: "Japón",
    question: "JPN-26 | ¿Cuál es el famoso pez venenoso considerado un manjar en Japón?",
    answer: "fugu",
    options: ["Atún rojo", "Fugu", "Pez espada"],
  },
  {
    country: "Japón",
    question: "JPN-27 | ¿Cómo se llama el sistema de escritura japonés utilizado para palabras extranjeras?",
    answer: "katakana",
    options: ["Hiragana", "Kanji", "Katakana"],
  },
  {
    country: "Japón",
    question: "JPN-28 | ¿Qué selección derrotó Japón en el Mundial 2022 causando una gran sorpresa?",
    answer: "alemania",
    options: ["Francia", "Alemania", "Brasil"],
  },
  {
    country: "Japón",
    question: "JPN-29 | ¿Qué jugador japonés es considerado uno de los más importantes de la historia reciente y jugó en el AC Milan?",
    answer: "keisuke honda",
    options: ["Shinji Okazaki", "Keisuke Honda", "Hidetoshi Nakata"],
  },
  {
    country: "Japón",
    question: "JPN-30 | ¿Cuál es el nombre del emperador actual de Japón?",
    answer: "naruhito",
    options: ["Naruhito", "Akihito", "Hirohito"],
  },
  {
    country: "Japón",
    question: "JPN-31 | ¿Qué ciudad japonesa es famosa por sus miles de templos y tradición histórica?",
    answer: "kyoto",
    options: ["Sapporo", "Kyoto", "Kobe"],
  },
  {
    country: "Japón",
    question: "JPN-32 | ¿Qué videojuego creado en Japón tiene como personaje principal a Mario?",
    answer: "nintendo",
    options: ["Sega", "Nintendo", "Sony"],
  },
  {
    country: "Japón",
    question: "JPN-33 | ¿Cuál es la empresa japonesa creadora de la consola PlayStation?",
    answer: "sony",
    options: ["Panasonic", "Sony", "Toshiba"],
  },
  {
    country: "Japón",
    question: "JPN-34 | ¿Qué país organizó junto con Japón el Mundial de fútbol 2002?",
    answer: "corea del sur",
    options: ["China", "Corea del Sur", "Australia"],
  },
  {
    country: "Japón",
    question: "JPN-35 | ¿Cómo se llama el bosque japonés conocido por el florecimiento de los cerezos?",
    answer: "sakura forest",
    options: ["Sakura Forest", "Kamakura", "Fuji Garden"],
  },

  // ==========================================
  // INGLATERRA (ING)
  // ==========================================
  {
    country: "Inglaterra",
    question: "ING-1 | ¿Qué selección eliminó a Inglaterra en cuartos del Mundial 1986 con el famoso gol de 'La Mano de Dios'?",
    answer: "argentina",
    options: ["Brasil", "Argentina", "Francia"],
  },
  {
    country: "Inglaterra",
    question: "ING-2 | ¿Quién era el capitán inglés en el Mundial 2006?",
    answer: "david beckham",
    options: ["David Beckham", "Steven Gerrard", "Frank Lampard"],
  },
  {
    country: "Inglaterra",
    question: "ING-3 | ¿Qué jugador inglés fue expulsado ante Portugal en el Mundial 2006?",
    answer: "wayne rooney",
    options: ["Wayne Rooney", "Beckham", "Owen"],
  },
  {
    country: "Inglaterra",
    question: "ING-4 | ¿Contra qué país quedó eliminado Inglaterra en semifinales del Mundial 2018?",
    answer: "croacia",
    options: ["Francia", "Croacia", "Bélgica"],
  },
  {
    country: "Inglaterra",
    question: "ING-5 | ¿Cuál fue la mejor actuación de Inglaterra después de 1966?",
    answer: "finalista",
    options: ["Campeón", "Finalista", "Semifinalista"],
  },
  {
    country: "Inglaterra",
    question: "ING-6 | ¿Quién es el máximo goleador histórico de Inglaterra?",
    answer: "harry kane",
    options: ["Wayne Rooney", "Harry Kane", "Gary Lineker"],
  },
  {
    country: "Inglaterra",
    question: "ING-7 | ¿Qué entrenador dirigió a Inglaterra en el Mundial 2022?",
    answer: "gareth southgate",
    options: ["Gareth Southgate", "Fabio Capello", "Sven-Göran Eriksson"],
  },
  {
    country: "Inglaterra",
    question: "ING-8 | ¿Contra qué selección quedó eliminada Inglaterra en el Mundial 2022?",
    answer: "francia",
    options: ["Marruecos", "Francia", "Portugal"],
  },
  {
    country: "Inglaterra",
    question: "ING-9 | ¿Qué famoso grupo musical nació en Liverpool?",
    answer: "the beatles",
    options: ["Queen", "The Beatles", "ABBA"],
  },
  {
    country: "Inglaterra",
    question: "ING-10 | ¿Cómo se llama la residencia oficial de la monarquía británica en Londres?",
    answer: "buckingham palace",
    options: ["Windsor Castle", "Buckingham Palace", "Westminster"],
  },
  {
    country: "Inglaterra",
    question: "ING-11 | ¿Qué universidad inglesa es una de las más antiguas y prestigiosas del mundo?",
    answer: "oxford",
    options: ["Harvard", "Oxford", "Salamanca"],
  },
  {
    country: "Inglaterra",
    question: "ING-12 | ¿Cuál es el deporte creado en Inglaterra que luego se convirtió en el fútbol moderno?",
    answer: "football association",
    options: ["Rugby", "Cricket", "Football Association"],
  },
  {
    country: "Inglaterra",
    question: "ING-13 | ¿Qué famoso naturalista inglés desarrolló la teoría de la evolución?",
    answer: "darwin",
    options: ["Darwin", "Pasteur", "Tesla"],
  },
  {
    country: "Inglaterra",
    question: "ING-14 | ¿Cuál es el punto más alto de Inglaterra?",
    answer: "scafell pike",
    options: ["Ben Nevis", "Scafell Pike", "Snowdon"],
  },
  {
    country: "Inglaterra",
    question: "ING-15 | ¿Qué selección derrotó a Inglaterra por penales en la Eurocopa 2021 disputada en Wembley?",
    answer: "italia",
    options: ["Italia", "España", "Francia"],
  },
  {
    country: "Inglaterra",
    question: "ING-16 | ¿Qué número utilizaba David Beckham en gran parte de su carrera con Inglaterra?",
    answer: "7",
    options: ["7", "10", "23"],
  },
  {
    country: "Inglaterra",
    question: "ING-17 | ¿Qué famoso físico inglés formuló las leyes del movimiento?",
    answer: "isaac newton",
    options: ["Isaac Newton", "Stephen Hawking", "Faraday"],
  },
  {
    country: "Inglaterra",
    question: "ING-18 | ¿Cuál es el nombre del himno no oficial más tradicional del fútbol inglés?",
    answer: "three lions",
    options: ["Rule Britannia", "God Save the King", "Three Lions"],
  },
  {
    country: "Inglaterra",
    question: "ING-19 | ¿Qué países comparten frontera terrestre directa con Inglaterra?",
    answer: "escocia y gales",
    options: ["Irlanda y Escocia", "Escocia y Gales", "Francia y Gales"],
  },
  {
    country: "Inglaterra",
    question: "ING-20 | ¿Qué arquero inglés cometió un grave error ante Alemania en el Mundial 2010 y fue muy cuestionado?",
    answer: "robert green",
    options: ["Joe Hart", "David James", "Robert Green"],
  },
  {
    country: "Inglaterra",
    question: "ING-21 | ¿Qué inventor inglés perfeccionó la máquina de vapor durante la Revolución Industrial?",
    answer: "james watt",
    options: ["James Watt", "Graham Bell", "Edison"],
  },
  {
    country: "Inglaterra",
    question: "ING-22 | ¿Cuál es el ave símbolo del club inglés Liverpool FC?",
    answer: "cormorán (liver bird)",
    options: ["Halcón", "Cormorán (Liver Bird)", "Águila"],
  },
  {
    country: "Inglaterra",
    question: "ING-23 | ¿En qué continente se encuentra Inglaterra?",
    answer: "europa",
    options: ["Asia", "Oceanía", "Europa"],
  },
  {
    country: "Inglaterra",
    question: "ING-24 | ¿Qué famoso torneo de tenis se juega en Inglaterra?",
    answer: "wimbledon",
    options: ["Roland Garros", "Wimbledon", "US Open"],
  },
  {
    country: "Inglaterra",
    question: "ING-25 | Inglaterra goleó 6-1 a Panamá en el Mundial 2018, ¿qué selección era la rival?",
    answer: "inglaterra",
    options: ["Bélgica", "Inglaterra", "Croacia"],
  },
  {
    country: "Inglaterra",
    question: "ING-26 | ¿Qué científico inglés es reconocido por descubrir la penicilina?",
    answer: "fleming",
    options: ["Fleming", "Darwin", "Newton"],
  },
  {
    country: "Inglaterra",
    question: "ING-27 | ¿Qué ciudad inglesa es conocida por su importante industria universitaria y tecnológica, junto con Oxford?",
    answer: "cambridge",
    options: ["Cambridge", "Bristol", "Leeds"],
  },
];

export function getQuestionPoolForTeams(teamNames: string[]) {
  const allowedCountries = new Set(teamNames);
  return QUESTIONS_DB.filter((item) => allowedCountries.has(item.country));
}

export function pickRandomQuestion(questions: QuestionItem[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}