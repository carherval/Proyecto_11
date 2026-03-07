import './Menu.css'

import { NavLink } from 'react-router-dom'
import options from '../../utils/options'

// Componente que pinta el menú de navegación en el cuerpo principal de la página de inicio y en la cabecera del resto de páginas
const Menu = ({ isHome }) => (
  <nav className={`flex menu${isHome ? '-home' : ''}`}>
    {Object.values(options.DRAGON_BALL_SECTIONS).map((dbSection) => (
      <NavLink
        key={dbSection.id}
        className={({ isActive }) =>
          !isHome && isActive ? 'active' : undefined
        }
        to={dbSection.id}
      >
        {dbSection.title}
      </NavLink>
    ))}
  </nav>
)

export default Menu
