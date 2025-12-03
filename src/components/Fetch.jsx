import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ERROR_MSG } from '../DragonBall'
import Character from './Character/Character'
import Loader from './Loader/Loader'
import Error from '../pages/Error'

const getData = async (fetchUrl) => await (await fetch(fetchUrl)).json()

export const SagaCharactersFetch = ({ sagaId }) => {
  const [sagaCharacters, setSagaCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getSagaCharacters = async () => {
    try {
      setIsLoading(true)
      setSagaCharacters(
        await getData(`https://dragonballapp.vercel.app/${sagaId}`)
      )
    } catch (error) {
      const h2 = document.querySelector('h2')

      if (h2 != null) {
        h2.outerHTML = ''
      }

      setIsLoading(false)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSagaCharacters()
  }, [sagaId])

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error errorMsg={ERROR_MSG.error} />
  ) : (
    <ul className='flex personajes'>
      {sagaCharacters
        .sort((character1, character2) =>
          character1.name.localeCompare(character2.name)
        )
        .map((character) => (
          <li key={character.id} className='flex'>
            <Link to={`${character.id}`}>{character.name}</Link>
          </li>
        ))}
    </ul>
  )
}

export const CharacterFetch = ({ sagaId, characterId }) => {
  const [character, setCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const getCharacter = async () => {
    try {
      setIsLoading(true)
      setIsImageLoaded(false)

      const characterJson = await getData(
        `https://dragonballapp.vercel.app/${sagaId}/${characterId}`
      )

      if (characterJson.id == null) {
        setIsLoading(false)
        setIsImageLoaded(true)
      } else {
        const img = new Image()

        img.src = characterJson.image
        img.onload = () => {
          setCharacter(characterJson)
          setIsLoading(false)
          setIsImageLoaded(true)
        }
      }
    } catch (error) {
      setIsLoading(false)
      setIsImageLoaded(true)
      setIsError(true)
    }
  }

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
