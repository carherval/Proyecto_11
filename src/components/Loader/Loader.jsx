import './Loader.css'

import strings from '../../utils/strings'

// Componente que muestra una imagen de carga durante las llamadas "fetch"
const Loader = () => (
  <div id='loader' className='flex'>
    <div className='flex loader'>
      <img src='/assets/images/bola.png' alt={strings.LOADING_MSG} />
      <p>{strings.LOADING_MSG}</p>
    </div>
  </div>
)

export default Loader
