import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ERROR_MSG } from '../DragonBall'
import Character from './Character/Character'
import Filter, {
  GENRE_FILTER_OPTIONS,
  PLANET_FILTER_OPTIONS,
  RACE_FILTER_OPTIONS,
  TRANSFORMATION_FILTER_OPTIONS
} from './Filter/Filter'
import Loader from './Loader/Loader'
import Error from '../pages/Error'

export const NO_INFO_STR = 'No hay información disponible'
const UNKNOWN_NAME = 'Nombre desconocido'

// Secciones de información de los personajes
export const CHARACTER_INFO_SECTIONS = {
  data: { id: 'data', title: 'Datos básicos' },
  descr: { id: 'descr', title: 'Descripción' },
  bio: { id: 'bio', title: 'Biografía' },
  transformations: { id: 'transformations', title: 'Transformaciones' }
}

// Campos de información de la sección "Datos básicos" de los personajes
export const CHARACTER_DATA_FIELD_LABELS = {
  name: { id: 'name', title: 'Nombre' },
  genre: { id: 'genre', title: 'Género' },
  race: { id: 'race', title: 'Raza' },
  planet: { id: 'planet', title: 'Planeta' }
}

export const COLLAPSIBLE_OPTIONS = {
  open: 'Mostrar',
  close: 'Ocultar'
}

const getData = async (fetchUrl) => await (await fetch(fetchUrl)).json()

export const getNotEmptyStr = (str, isNameCharacter = false) =>
  str != null && str.trim() !== ''
    ? str
    : !isNameCharacter
    ? NO_INFO_STR
    : UNKNOWN_NAME

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

// Componente que muestra el listado de personajes de una saga
export const SagaCharactersFetch = ({ sagaId }) => {
  const NO_RESULTS_STR = 'No hay resultados'

  // Estado para gestionar el listado de personajes de una saga
  const [sagaCharacters, setSagaCharacters] = useState([])
  // Estado para gestionar el filtrado de personajes de una saga
  const [filteredSagaCharacters, setFilteredSagaCharacters] = useState([])
  // Estado para gestionar la carga del listado de personajes de una saga
  const [isLoading, setIsLoading] = useState(true)
  // Estado para gestionar errores
  const [isError, setIsError] = useState(false)

  const getSagaCharacters = async () => {
    try {
      setIsLoading(true)
      setIsError(false)

      const sagaCharactersJson = await getData(
        `https://dragonballapp.vercel.app/${sagaId}`
      )

      setSagaCharacters(sagaCharactersJson)
      setFilteredSagaCharacters(sagaCharactersJson)
    } catch (error) {
      const h2 = document.querySelector('h2')

      if (h2 != null) {
        h2.outerHTML = ''
      }

      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Devuelve el filtrado de personajes de una saga en función de las opciones elegidas en el filtro
  const getFilteredSagaCharacters = (filterValues) => {
    let filteredCharacters = sagaCharacters

    // Filtrado por el nombre del personaje
    if (filterValues.name !== '') {
      filteredCharacters = filteredCharacters.filter((character) =>
        new RegExp(filterValues.name, 'i').test(
          getNotEmptyStr(character.name, true)
        )
      )
    }

    // Filtrado por el género del personaje
    if (filterValues.genre !== GENRE_FILTER_OPTIONS.allGenres.id) {
      filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
        filteredCharacters,
        CHARACTER_DATA_FIELD_LABELS.genre.id,
        GENRE_FILTER_OPTIONS,
        filterValues,
        GENRE_FILTER_OPTIONS.otherGenres.id
      )
    }

    // Filtrado por la raza del personaje
    if (filterValues.race !== RACE_FILTER_OPTIONS.allRaces.id) {
      filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
        filteredCharacters,
        CHARACTER_DATA_FIELD_LABELS.race.id,
        RACE_FILTER_OPTIONS,
        filterValues,
        RACE_FILTER_OPTIONS.otherRaces.id
      )
    }

    // Filtrado por el planeta del personaje
    if (filterValues.planet !== PLANET_FILTER_OPTIONS.allPlanets.id) {
      filteredCharacters = getFilteredSagaCharactersByCharacterDataField(
        filteredCharacters,
        CHARACTER_DATA_FIELD_LABELS.planet.id,
        PLANET_FILTER_OPTIONS,
        filterValues,
        PLANET_FILTER_OPTIONS.otherPlanets.id
      )
    }

    // Filtrado por las transformaciones del personaje
    if (
      filterValues.transformations !== TRANSFORMATION_FILTER_OPTIONS.both.id
    ) {
      filteredCharacters = filteredCharacters.filter((character) =>
        filterValues.transformations === TRANSFORMATION_FILTER_OPTIONS.yes.id
          ? character.transformations[0].image != null &&
            character.transformations[0].image !== ''
          : character.transformations[0].image == null ||
            character.transformations[0].image === ''
      )
    }

    setFilteredSagaCharacters(filteredCharacters)
  }

  // Actualización del listado de personajes al cambiar de saga
  useEffect(() => {
    getSagaCharacters()
  }, [sagaId])

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error errorMsg={ERROR_MSG.error} />
  ) : (
    <>
      <section className='filter'>
        <Filter getFilteredSagaCharacters={getFilteredSagaCharacters} />
      </section>
      <section
        className={`flex${
          filteredSagaCharacters.length === 0 ? ' no-characters' : ''
        }`}
      >
        {filteredSagaCharacters.length > 0 ? (
          // Listado de personajes de la saga en orden alfabético
          <ul className='flex personajes'>
            {[...filteredSagaCharacters]
              .sort((character1, character2) =>
                getNotEmptyStr(character1.name, true).localeCompare(
                  getNotEmptyStr(character2.name, true)
                )
              )
              .map((character) => (
                <li key={character.id} className='flex'>
                  <Link to={`${character.id}`}>
                    {getNotEmptyStr(character.name, true)}
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <div className='flex'>
            <p>{NO_RESULTS_STR}</p>
          </div>
        )}
      </section>
    </>
  )
}

// Componente que muestra un personaje
export const CharacterFetch = ({ sagaId, characterId }) => {
  // Estado para gestionar el personaje
  const [character, setCharacter] = useState({})
  // Estado para gestionar la carga del personaje
  const [isLoading, setIsLoading] = useState(true)
  // Estado para gestionar la carga de la imagen del personaje
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  // Estado para gestionar errores
  const [isError, setIsError] = useState(false)

  const getCharacter = async () => {
    try {
      setIsLoading(true)
      setIsImageLoaded(false)
      setIsError(false)

      const characterJson = await getData(
        `https://dragonballapp.vercel.app/${sagaId}/${characterId}`
      )

      // Si no se encuentra el personaje, se anula el "loader" para poder mostrar el mensaje de error
      if (characterJson.id == null) {
        setIsLoading(false)
        setIsImageLoaded(true)
      } else {
        const apiImg = new Image()

        apiImg.src = characterJson.image
        apiImg.onload = () => {
          setCharacter(characterJson)
          setIsLoading(false)
          setIsImageLoaded(true)
        }
        // Si la carga de la imagen da error, se carga una imagen genérica
        apiImg.onerror = () => {
          const localImg = new Image()

          localImg.src = '/assets/images/silueta.png'
          localImg.onload = () => {
            characterJson.image = localImg.src
            setCharacter(characterJson)
            setIsLoading(false)
            setIsImageLoaded(true)
          }
        }
      }
    } catch (error) {
      // Se anula el "loader" para poder mostrar el mensaje de error
      setIsLoading(false)
      setIsImageLoaded(true)
      setIsError(true)
    }
  }

  // Actualización del personaje al cambiar de personaje
  useEffect(() => {
    getCharacter()
  }, [characterId])

  return isLoading || !isImageLoaded ? (
    <Loader />
  ) : isError ? (
    <Error errorMsg={ERROR_MSG.error} />
  ) : character.id == null ? (
    <Error errorMsg={ERROR_MSG.character} />
  ) : (
    <Character character={character} />
  )
}
