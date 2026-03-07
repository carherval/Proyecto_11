const DRAGON_BALL_SECTIONS = {
  dragonball: { id: 'dragonball', title: 'Dragon Ball' },
  dragonballz: { id: 'dragonballz', title: 'Dragon Ball Z' },
  dragonballgt: { id: 'dragonballgt', title: 'Dragon Ball GT' },
  dragonballsuper: { id: 'dragonballsuper', title: 'Dragon Ball Super' },
  dragons: { id: 'dragons', title: 'Dragones' }
}

// Secciones de información de los personajes
const CHARACTER_INFO_SECTIONS = {
  data: { id: 'data', title: 'Datos básicos' },
  descr: { id: 'descr', title: 'Descripción' },
  bio: { id: 'bio', title: 'Biografía' },
  transformations: { id: 'transformations', title: 'Transformaciones' }
}

// Campos de información de la sección "Datos básicos" de los personajes
const CHARACTER_DATA_FIELD_LABELS = {
  name: { id: 'name', title: 'Nombre' },
  genre: { id: 'genre', title: 'Género' },
  race: { id: 'race', title: 'Raza' },
  planet: { id: 'planet', title: 'Planeta' }
}

const COLLAPSIBLE_OPTIONS = {
  open: 'Mostrar',
  close: 'Ocultar'
}

const FILTER_OPTION_COMMON_LABELS = {
  all: 'Todos',
  unknown: 'Desconocido',
  others: 'Otros'
}

// Valores admitidos para las opciones de los campos de información del filtro
const FILTER_OPTION_VALUE_STRS = {
  angel: 'angel|ángel',
  heaven: 'cielo',
  unknown: 'desconocid',
  god: 'dios',
  no: 'false',
  female: 'femenino',
  warrior: 'guerrero',
  human: 'human|terr',
  male: 'masculino',
  namek: 'namek|nameck',
  saiyajin: 'saiy|shay',
  earth: 'tierra',
  yes: 'true',
  universe: 'universo',
  vegeta: 'vegeta|vejeta'
}

// Opciones en el filtro para el campo de información "Género" del personaje
const GENRE_FILTER_OPTIONS = {
  allGenres: {
    id: 'allGenres',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  male: {
    id: 'male',
    title: 'Masculino',
    value: FILTER_OPTION_VALUE_STRS.male
  },
  female: {
    id: 'female',
    title: 'Femenino',
    value: FILTER_OPTION_VALUE_STRS.female
  },
  otherGenres: {
    id: 'otherGenres',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.male}|${FILTER_OPTION_VALUE_STRS.female}`
  }
}

// Opciones en el filtro para el campo de información "Raza" del personaje
const RACE_FILTER_OPTIONS = {
  allRaces: {
    id: 'allRaces',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  angel: { id: 'angel', title: 'Ángel', value: FILTER_OPTION_VALUE_STRS.angel },
  unknownRace: {
    id: 'unknownRace',
    title: FILTER_OPTION_COMMON_LABELS.unknown,
    value: FILTER_OPTION_VALUE_STRS.unknown
  },
  god: { id: 'god', title: 'Dios', value: FILTER_OPTION_VALUE_STRS.god },
  warrior: {
    id: 'warrior',
    title: 'Guerrero',
    value: FILTER_OPTION_VALUE_STRS.warrior
  },
  human: {
    id: 'human',
    title: 'Humano',
    value: FILTER_OPTION_VALUE_STRS.human
  },
  namekian: {
    id: 'namekian',
    title: 'Namekiano',
    value: FILTER_OPTION_VALUE_STRS.namek
  },
  saiyajin: {
    id: 'saiyajin',
    title: 'Saiyajin',
    value: FILTER_OPTION_VALUE_STRS.saiyajin
  },
  otherRaces: {
    id: 'otherRaces',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.angel}|${FILTER_OPTION_VALUE_STRS.unknown}|${FILTER_OPTION_VALUE_STRS.god}|${FILTER_OPTION_VALUE_STRS.warrior}|${FILTER_OPTION_VALUE_STRS.human}|${FILTER_OPTION_VALUE_STRS.namek}|${FILTER_OPTION_VALUE_STRS.saiyajin}`
  }
}

// Opciones en el filtro para el campo de información "Planeta" del personaje
const PLANET_FILTER_OPTIONS = {
  allPlanets: {
    id: 'allPlanets',
    title: FILTER_OPTION_COMMON_LABELS.all,
    value: ''
  },
  heaven: {
    id: 'heaven',
    title: 'Cielo',
    value: FILTER_OPTION_VALUE_STRS.heaven
  },
  unknownPlanet: {
    id: 'unknownPlanet',
    title: FILTER_OPTION_COMMON_LABELS.unknown,
    value: FILTER_OPTION_VALUE_STRS.unknown
  },
  namek: { id: 'namek', title: 'Namek', value: FILTER_OPTION_VALUE_STRS.namek },
  earth: {
    id: 'earth',
    title: 'Tierra',
    value: FILTER_OPTION_VALUE_STRS.earth
  },
  universe: {
    id: 'universe',
    title: 'Universo',
    value: FILTER_OPTION_VALUE_STRS.universe
  },
  vegeta: {
    id: 'vegeta',
    title: 'Vegeta',
    value: FILTER_OPTION_VALUE_STRS.vegeta
  },
  otherPlanets: {
    id: 'otherPlanets',
    title: FILTER_OPTION_COMMON_LABELS.others,
    value: `${FILTER_OPTION_VALUE_STRS.heaven}|${FILTER_OPTION_VALUE_STRS.unknown}|${FILTER_OPTION_VALUE_STRS.namek}|${FILTER_OPTION_VALUE_STRS.earth}|${FILTER_OPTION_VALUE_STRS.universe}|${FILTER_OPTION_VALUE_STRS.vegeta}`
  }
}

// Opciones en el filtro para la sección de información "Transformaciones" del personaje
const TRANSFORMATION_FILTER_OPTIONS = {
  both: { id: 'both', title: FILTER_OPTION_COMMON_LABELS.all, value: '' },
  yes: { id: 'yes', title: 'Sí', value: FILTER_OPTION_VALUE_STRS.yes },
  no: { id: 'no', title: 'No', value: FILTER_OPTION_VALUE_STRS.no }
}

const FILTER_FIELD_OPTIONS = {
  name: {},
  genre: GENRE_FILTER_OPTIONS,
  race: RACE_FILTER_OPTIONS,
  planet: PLANET_FILTER_OPTIONS,
  transformations: TRANSFORMATION_FILTER_OPTIONS
}

const options = {
  DRAGON_BALL_SECTIONS,
  CHARACTER_INFO_SECTIONS,
  CHARACTER_DATA_FIELD_LABELS,
  COLLAPSIBLE_OPTIONS,
  FILTER_OPTION_COMMON_LABELS,
  FILTER_OPTION_VALUE_STRS,
  GENRE_FILTER_OPTIONS,
  RACE_FILTER_OPTIONS,
  PLANET_FILTER_OPTIONS,
  TRANSFORMATION_FILTER_OPTIONS,
  FILTER_FIELD_OPTIONS
}

export default options
