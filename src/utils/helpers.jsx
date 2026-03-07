import options from './options'
import strings from './strings'

const getData = async (fetchUrl) => await (await fetch(fetchUrl)).json()

const getNotEmptyStr = (str, isNameCharacter = false) =>
  str != null && str.trim() !== ''
    ? str
    : !isNameCharacter
      ? strings.NO_INFO_STR
      : strings.UNKNOWN_NAME

/* Devuelve los personajes de la saga filtrados por un campo de información de la sección "Datos básicos" del personaje
filteredCharacters: listado de personajes filtrados
characterDataFieldId: identificador del campo de información
filterOptions: opciones de selección en el filtro para el campo de información
filterValues: valores admitidos de la opción elegida para filtrar el listado de personajes
othersId: identificador de la opción "Otros" del campo de información */
const getFilteredSagaCharactersByCharacterDataField = (
  filteredCharacters,
  characterDataFieldId,
  filterOptions,
  filterValues,
  othersId
) => {
  // Expresión regular que evalúa si el valor del campo de información de la sección "Datos básicos" del personaje cumple con los valores admitidos de la opción elegida
  const regExp = new RegExp(
    filterOptions[filterValues[characterDataFieldId]].value,
    'i'
  )

  // Si la opción elegida en el filtro no es "Otros", se filtran los personajes de la saga que cumplen los valores admitidos de la opción seleccionada en el filtro
  // Si la opción elegida en el filtro es "Otros", se filtran los personajes de la saga que cumplen cualquier valor diferente a los valores admitidos de la opción seleccionada en el filtro
  return filteredCharacters.filter((character) =>
    filterValues[characterDataFieldId] !== othersId
      ? regExp.test(character[characterDataFieldId])
      : !regExp.test(character[characterDataFieldId])
  )
}

// Devuelve los datos básicos del personaje: nombre, género, raza y planeta
const getCharacterData = (character) => (
  <>
    <div className='flex field'>
      <div className='flex label'>
        {options.CHARACTER_DATA_FIELD_LABELS.name.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.name, true)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {options.CHARACTER_DATA_FIELD_LABELS.genre.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.genre)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {options.CHARACTER_DATA_FIELD_LABELS.race.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.race)}</div>
    </div>
    <div className='flex field'>
      <div className='flex label'>
        {options.CHARACTER_DATA_FIELD_LABELS.planet.title}:
      </div>
      <div className='flex value'>{getNotEmptyStr(character.planet)}</div>
    </div>
  </>
)

const getCharacterDescr = (character) => (
  <p>{getNotEmptyStr(character.description)}</p>
)

const getCharacterBio = (character) => (
  <p>{getNotEmptyStr(character.biography)}</p>
)

const getCharacterTransformations = (character) =>
  character.transformations[0].image != null &&
  character.transformations[0].image !== '' ? (
    <ul className='flex transformations'>
      {character.transformations.map((transformation) => (
        <li key={transformation.id ?? transformation.trans}>
          <img
            src={transformation.image}
            alt={getNotEmptyStr(transformation.title)}
            title={getNotEmptyStr(transformation.title)}
            // Si la carga de la imagen da error, se carga una imagen genérica
            onError={(event) => {
              event.currentTarget.classList.add('no-image')
              event.currentTarget.src = '/assets/images/silueta.png'
            }}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>{strings.NO_INFO_STR}</p>
  )

const getHtmlLink = ({
  href,
  text,
  isTargetBlank = false,
  title = ''
} = {}) => (
  <a
    href={href}
    target={isTargetBlank ? '_blank' : undefined}
    title={
      title.trim() !== '' || isTargetBlank
        ? `${title.trim()}${title.trim() !== '' && isTargetBlank ? '. ' : ''}${
            isTargetBlank ? strings.OPEN_NEW_WINDOW_STR : ''
          }`
        : undefined
    }
  >
    {text}
  </a>
)

const helpers = {
  getData,
  getNotEmptyStr,
  getFilteredSagaCharactersByCharacterDataField,
  getCharacterData,
  getCharacterDescr,
  getCharacterBio,
  getCharacterTransformations,
  getHtmlLink
}

export default helpers
