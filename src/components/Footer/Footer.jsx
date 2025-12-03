import './Footer.css'

const OPEN_NEW_WINDOW_STR = 'Abre nueva ventana'

const Footer = () => (
  <footer className='flex pie'>
    <div>
      <p>
        Creado por <span>Carlos Hernández</span>
      </p>
    </div>
    <div>
      <p>
        Fuente:{' '}
        <a
          href='https://dragonballapp.vercel.app/'
          target='_blank'
          title={OPEN_NEW_WINDOW_STR}
        >
          Dragon Ball API
        </a>
      </p>
      <p>
        Autor:{' '}
        <a
          href='https://juanppdev.vercel.app/'
          target='_blank'
          title={OPEN_NEW_WINDOW_STR}
        >
          Juan Pablo Patiño López
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
