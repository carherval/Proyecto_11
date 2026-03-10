import { useEffect, useState } from 'react'
import Character from '../Character/Character'
import Loader from '../Loader/Loader'
import Error from '../../pages/Error'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra un personaje
const CharacterFetch = ({ sagaId, characterId }) => {
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

      const characterJson = await helpers.getData(
        `${strings.API_URL}${sagaId}/${characterId}`
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
    <Error errorMsg={strings.ERROR_MSG.error} />
  ) : character.id == null ? (
    <Error errorMsg={strings.ERROR_MSG.character} />
  ) : (
    <Character character={character} />
  )
}

export default CharacterFetch
