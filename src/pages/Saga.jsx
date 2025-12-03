import { useParams } from 'react-router-dom'
import { DRAGON_BALL_SECTIONS, ERROR_MSG } from '../DragonBall'
import { SagaCharactersFetch } from '../components/Fetch'
import Error from './Error'

const Saga = () => {
  const { sagaId } = useParams()
  const dbSection = DRAGON_BALL_SECTIONS[sagaId]

  return dbSection != null ? (
    <section className='flex'>
      <h2>
        {`${
          dbSection.id !== DRAGON_BALL_SECTIONS.dragons.id
            ? 'Personajes de '
            : ''
        }${dbSection.title}`}
      </h2>
      <SagaCharactersFetch sagaId={sagaId} />
    </section>
  ) : (
    <Error errorMsg={ERROR_MSG.saga} />
  )
}

export default Saga
