import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Filter from '../Filter/Filter'
import Loader from '../Loader/Loader'
import Error from '../../pages/Error'
import helpers from '../../utils/helpers'
import options from '../../utils/options'
import strings from '../../utils/strings'

// Componente que muestra el listado de personajes de una saga
const SagaCharactersFetch = ({ sagaId }) => {
  // Estado para gestionar el listado de personajes de una saga
  const [sagaCharacters, setSagaCharacters] = useState([])
  // Estado para gestionar el filtrado de personajes de una saga
  const [filteredSagaCharacters, setFilteredSagaCharacters] = useState([])
  // Estado para gestionar la carga del listado de personajes de una saga
  const [isLoading, setIsLoading] = useState(true)
  // Estado para gestionar errores
  const [isError, setIsError] = useState(false)

  const getSagaCharacters = async () => {
    const h2 = document.querySelector('h2')

    try {
      h2?.classList.remove('oculto')

      setIsLoading(true)
      setIsError(false)

      const sagaCharactersJson = await helpers.getData(
        `https://dragonballapp.vercel.app/${sagaId}`
      )

      setSagaCharacters(sagaCharactersJson)
      setFilteredSagaCharacters(sagaCharactersJson)
    } catch (error) {
      h2?.classList.add('oculto')

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
          helpers.getNotEmptyStr(character.name, true)
        )
      )
    }

    // Filtrado por el género del personaje
    if (filterValues.genre !== options.GENRE_FILTER_OPTIONS.allGenres.id) {
      filteredCharacters =
        helpers.getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          options.CHARACTER_DATA_FIELD_LABELS.genre.id,
          options.GENRE_FILTER_OPTIONS,
          filterValues,
          options.GENRE_FILTER_OPTIONS.otherGenres.id
        )
    }

    // Filtrado por la raza del personaje
    if (filterValues.race !== options.RACE_FILTER_OPTIONS.allRaces.id) {
      filteredCharacters =
        helpers.getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          options.CHARACTER_DATA_FIELD_LABELS.race.id,
          options.RACE_FILTER_OPTIONS,
          filterValues,
          options.RACE_FILTER_OPTIONS.otherRaces.id
        )
    }

    // Filtrado por el planeta del personaje
    if (filterValues.planet !== options.PLANET_FILTER_OPTIONS.allPlanets.id) {
      filteredCharacters =
        helpers.getFilteredSagaCharactersByCharacterDataField(
          filteredCharacters,
          options.CHARACTER_DATA_FIELD_LABELS.planet.id,
          options.PLANET_FILTER_OPTIONS,
          filterValues,
          options.PLANET_FILTER_OPTIONS.otherPlanets.id
        )
    }

    // Filtrado por las transformaciones del personaje
    if (
      filterValues.transformations !==
      options.TRANSFORMATION_FILTER_OPTIONS.both.id
    ) {
      filteredCharacters = filteredCharacters.filter((character) =>
        filterValues.transformations ===
        options.TRANSFORMATION_FILTER_OPTIONS.yes.id
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
    <Error errorMsg={strings.ERROR_MSG.error} />
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
                helpers
                  .getNotEmptyStr(character1.name, true)
                  .localeCompare(helpers.getNotEmptyStr(character2.name, true))
              )
              .map((character) => (
                <li key={character.id} className='flex'>
                  <Link to={`${character.id}`}>
                    {helpers.getNotEmptyStr(character.name, true)}
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <div className='flex'>
            <p>{strings.NO_RESULTS_STR}</p>
          </div>
        )}
      </section>
    </>
  )
}

export default SagaCharactersFetch
