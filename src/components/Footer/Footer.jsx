import './Footer.css'

import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

const Footer = () => (
  <footer className='flex pie'>
    <div>
      <p>
        Creado por <span>{strings.AUTHOR_FULLNAME}</span>
      </p>
    </div>
    <div>
      <p>
        Fuente:{' '}
        {helpers.getHtmlLink({
          href: strings.API_URL,
          text: strings.API_NAME,
          isTargetBlank: true
        })}
      </p>
      <p>
        Autor:{' '}
        {helpers.getHtmlLink({
          href: strings.API_AUTHOR_URL,
          text: strings.API_AUTHOR_FULLNAME,
          isTargetBlank: true
        })}
      </p>
    </div>
  </footer>
)

export default Footer
