import './Menu.css'

import { NavLink } from 'react-router-dom'
import { DRAGON_BALL_SECTIONS } from '../../DragonBall'

const Menu = ({ isHome }) => (
  <nav className={`flex menu${isHome ? '-home' : ''}`}>
    {Object.values(DRAGON_BALL_SECTIONS).map((dbSection) => (
      <NavLink
        key={dbSection.id}
        to={dbSection.id}
        className={({ isActive }) =>
          !isHome && isActive ? 'active' : undefined
        }
      >
        {dbSection.title}
      </NavLink>
    ))}
  </nav>
)

export default Menu
