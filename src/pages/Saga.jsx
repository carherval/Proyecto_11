import { useParams } from 'react-router-dom'
import SagaCharactersFetch from '../components/Fetch/SagaCharactersFetch'
import Error from './Error'
import options from '../utils/options'
import strings from '../utils/strings'

// Página que muestra el listado de personajes de una saga
const Saga = () => {
  const { sagaId } = useParams()
  const dbSection = options.DRAGON_BALL_SECTIONS[sagaId]

  return dbSection != null ? (
    <>
      <h2>
        {`${
          dbSection.id !== options.DRAGON_BALL_SECTIONS.dragons.id
            ? 'Personajes de '
            : ''
        }${dbSection.title}`}
      </h2>
      <SagaCharactersFetch sagaId={sagaId} />
    </>
  ) : (
    <Error errorMsg={strings.ERROR_MSG.saga} />
  )
}

export default Saga
