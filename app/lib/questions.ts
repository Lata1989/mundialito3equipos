export interface QuestionItem {
  country: string;
  question: string;
  answer: string;
  options: string[];
}

export const QUESTIONS_DB: QuestionItem[] = [
  {
    country: "Argentina",
    question: "¿En qué ciudad se encuentra el famoso Obelisco?",
    answer: "Buenos Aires",
    options: ["Mendoza", "Córdoba", "Buenos Aires", "Rosario"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es el apodo de la camiseta argentina?",
    answer: "La Albiceleste",
    options: ["La Roja", "La Albiceleste", "La Verde", "La Celeste"],
  },
  {
    country: "España",
    question: "¿Quién pintó 'Las Meninas'?",
    answer: "Velazquez",
    options: ["Goya", "Velazquez", "El Greco", "Picasso"],
  },
  {
    country: "Brasil",
    question: "¿Qué ciudad es la capital de Brasil?",
    answer: "Brasilia",
    options: ["Río", "São Paulo", "Brasília", "Salvador"],
  },
  {
    country: "Francia",
    question: "¿En qué año ganó Francia su primer Mundial?",
    answer: "1998",
    options: ["1958", "1986", "1998", "2018"],
  },
  {
    country: "Inglaterra",
    question: "¿Quién escribió 'Hamlet'?",
    answer: "Shakespeare",
    options: ["Dickens", "Shakespeare", "Orwell", "Austen"],
  },
  {
    country: "Colombia",
    question: "¿Cuál es la capital de Colombia?",
    answer: "Bogotá",
    options: ["Medellín", "Cali", "Bogotá", "Barranquilla"],
  },
  {
    country: "Japón",
    question: "¿Cuál de estos es un plato típico japonés?",
    answer: "Sushi",
    options: ["Tacos", "Sushi", "Pizza", "Curry"],
  },
  {
    country: "México",
    question: "¿Cuál es la capital de México?",
    answer: "Ciudad de México",
    options: ["Guadalajara", "Monterrey", "Ciudad de México", "Cancún"],
  },
  {
    country: "Alemania",
    question: "¿Qué río pasa por Berlín?",
    answer: "Spree",
    options: ["Danubio", "Rin", "Spree", "Elba"],
  },
  // --- NUEVAS PREGUNTAS DE ARGENTINA ---
  {
    country: "Argentina",
    question: "¿En qué estadio Argentina ganó su primer Mundial en 1978?",
    answer: "Estadio Monumental",
    options: ["Estadio José Amalfitani", "Estadio Monumental", "Estadio Gigante de Arroyito", "Estadio Mario Kempes"],
  },
  {
    country: "Argentina",
    question: "¿Quién convirtió el primer gol de Argentina en el Mundial de 1986?",
    answer: "José Luis Brown",
    options: ["Diego Maradona", "Jorge Valdano", "Oscar Ruggeri", "José Luis Brown"],
  },
  {
    country: "Argentina",
    question: "¿Cuál fue el único Mundial en el que Argentina defendió el título como campeón vigente?",
    answer: "Italia 1990",
    options: ["México 1986", "Italia 1990", "Francia 1998", "Sudáfrica 2010"],
  },
  {
    country: "Argentina",
    question: "¿Quién hizo el gol de Argentina en la final del Mundial 2014?",
    answer: "Ningún argentino convirtió",
    options: ["Lionel Messi", "Gonzalo Higuaín", "Sergio Agüero", "Ningún argentino convirtió"],
  },
  {
    country: "Argentina",
    question: "¿Contra qué país debutó Lionel Messi en un Mundial?",
    answer: "Serbia y Montenegro",
    options: ["Costa de Marfil", "Serbia y Montenegro", "Alemania", "Países Bajos"],
  },
  {
    country: "Argentina",
    question: "¿Qué arquero argentino fue figura en la tanda de penales contra Países Bajos en Qatar 2022?",
    answer: "Emiliano Martínez",
    options: ["Sergio Romero", "Franco Armani", "Emiliano Martínez", "Gerónimo Rulli"],
  },
  {
    country: "Argentina",
    question: "¿Cuál de estos jugadores NO fue campeón mundial con Argentina en 2022?",
    answer: "Giovani Lo Celso",
    options: ["Ángel Di María", "Paulo Dybala", "Giovani Lo Celso", "Julián Álvarez"],
  },
  {
    country: "Argentina",
    question: "¿Cuántos goles tiene Messi en mundiales hasta el 2022?",
    answer: "13 goles",
    options: ["10 goles", "11 goles", "12 goles", "13 goles"],
  },
  {
    country: "Argentina",
    question: "Messi tiene 13 goles en los mundiales hasta 2022, ¿cuántos de ellos hizo de penal?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    country: "Argentina",
    question: "¿Cuántas asistencias tiene Messi en los mundiales hasta el 2022?",
    answer: "8 asistencias",
    options: ["5 asistencias", "6 asistencias", "7 asistencias", "8 asistencias"],
  },
  {
    country: "Argentina",
    question: "¿En qué mundial le atajaron el primer penal a Messi (tiempo regular)?",
    answer: "Rusia 2018",
    options: ["Sudáfrica 2010", "Brasil 2014", "Rusia 2018", "Qatar 2022"],
  },
  {
    country: "Argentina",
    question: "¿Quién metió el gol del 2-1 final contra Nigeria en el Mundial 2018?",
    answer: "Marcos Rojo",
    options: ["Marcos Rojo", "Lionel Messi", "Sergio Agüero", "Ángel Di María"],
  },
  {
    country: "Argentina",
    question: "¿Qué ocurrió el 25 de Mayo de 1810?",
    answer: "Se formó la Primera Junta",
    options: ["Se declaró la independencia", "Asumió el primer presidente", "Se formó la Primera Junta", "Se sancionó la Constitución"],
  },
  {
    country: "Argentina",
    question: "¿En qué provincia se declaró la Independencia Argentina?",
    answer: "Tucumán",
    options: ["Córdoba", "Buenos Aires", "Mendoza", "Tucumán"],
  },
  {
    country: "Argentina",
    question: "¿Quién fue el director supremo de las Provincias Unidas y organizó el Congreso de Tucumán?",
    answer: "Juan Martín de Pueyrredón",
    options: ["Manuel Belgrano", "Gervasio Posadas", "Juan Martín de Pueyrredón", "Bernardino Rivadavia"],
  },
  {
    country: "Argentina",
    question: "¿Cuál fue el nombre original de Argentina en la época colonial?",
    answer: "Virreinato del Río de la Plata",
    options: ["Virreinato del Río de la Plata", "Provincias Unidas del Sur", "Confederación Argentina", "República Federal del Plata"],
  },
  {
    country: "Argentina",
    question: "¿Quién creó la bandera argentina?",
    answer: "Manuel Belgrano",
    options: ["José de San Martín", "Manuel Belgrano", "Mariano Moreno", "Domingo Sarmiento"],
  },
  {
    country: "Argentina",
    question: "¿En qué batalla fue derrotado definitivamente Juan Manuel de Rosas?",
    answer: "Caseros",
    options: ["Cepeda", "Pavón", "Caseros", "San Lorenzo"],
  },
  {
    country: "Argentina",
    question: "¿Cuál fue el primer presidente de las Provincias Unidas del Río de la Plata (considerado primer presidente histórico)?",
    answer: "Bernardino Rivadavia",
    options: ["Julio A. Roca", "Bartolomé Mitre", "Bernardino Rivadavia", "Nicolás Avellaneda"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es la provincia argentina con mayor superficie?",
    answer: "Buenos Aires", // Nota: Buenos Aires es la de mayor superficie terrestre de las opciones dadas.
    options: ["Buenos Aires", "Chubut", "Santa Cruz", "Mendoza"],
  },
  {
    country: "Argentina",
    question: "¿Qué río sirve de límite natural entre Argentina y Uruguay?",
    answer: "Río Uruguay",
    options: ["Río Paraná", "Río Uruguay", "Río Salado", "Río Pilcomayo"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es la capital de la provincia de Tierra del Fuego?",
    answer: "Ushuaia",
    options: ["Río Grande", "Tolhuin", "Ushuaia", "Caleta Olivia"],
  },
  {
    country: "Argentina",
    question: "¿Qué provincia argentina NO tiene salida al mar?",
    answer: "Neuquén",
    options: ["Río Negro", "Chubut", "Neuquén", "Santa Cruz"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es el cerro más alto de América?",
    answer: "Aconcagua",
    options: ["Lanín", "Fitz Roy", "Mercedario", "Aconcagua"],
  },
  {
    country: "Argentina",
    question: "¿En qué provincia se encuentran las Cataratas del Iguazú?",
    answer: "Misiones",
    options: ["Corrientes", "Chaco", "Misiones", "Formosa"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es el lago más grande que se encuentra completamente dentro del territorio de Argentina?",
    answer: "Lago Argentino",
    options: ["Lago Nahuel Huapi", "Lago Argentino", "Lago Viedma", "Lago Fagnano"],
  },
  {
    country: "Argentina",
    question: "¿Qué provincia argentina limita con más países?",
    answer: "Salta",
    options: ["Salta", "Jujuy", "Misiones", "Mendoza"],
  },
  {
    country: "Argentina",
    question: "¿Cuál es la ciudad más austral del mundo reconocida oficialmente?",
    answer: "Ushuaia",
    options: ["Río Gallegos", "Punta Arenas", "Ushuaia", "Puerto Madryn"],
  },
  {
    country: "Argentina",
    question: "¿Qué provincia argentina produce mayor cantidad de vino?",
    answer: "Mendoza",
    options: ["San Juan", "Mendoza", "La Rioja", "Neuquén"],
  },
];

export function getQuestionPoolForTeams(teamNames: string[]) {
  const allowedCountries = new Set(teamNames);
  return QUESTIONS_DB.filter((item) => allowedCountries.has(item.country));
}

export function pickRandomQuestion(questions: QuestionItem[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}