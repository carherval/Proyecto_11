import { useParams } from 'react-router-dom'
import CharacterFetch from '../components/Fetch/CharacterFetch'
import Error from './Error'
import options from '../utils/options'
import strings from '../utils/strings'

// Página que muestra la información de un personaje
const Character = () => {
  const { sagaId, characterId } = useParams()
  const dbSection = options.DRAGON_BALL_SECTIONS[sagaId]

  return dbSection != null ? (
    <CharacterFetch sagaId={sagaId} characterId={characterId} />
  ) : (
    <Error errorMsg={strings.ERROR_MSG.saga} />
  )
}

export default Character
