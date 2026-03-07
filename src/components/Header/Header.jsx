import './Header.css'

import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import strings from '../../utils/strings'

const Header = ({ isHome }) => (
  <header className={`flex cabecera${isHome ? '-home' : ''}`}>
    {isHome ? (
      <>
        <h1>{strings.PAGE_TITLE}</h1>
        <img src='/assets/images/bola.png' alt={strings.PAGE_TITLE} />
      </>
    ) : (
      <h1 className='flex'>
        <Link to=''>{strings.PAGE_TITLE}</Link>
      </h1>
    )}
    {!isHome && <Menu isHome={isHome} />}
  </header>
)

export default Header
