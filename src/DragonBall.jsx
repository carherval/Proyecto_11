import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const DragonBall = () => (
  <>
    <Header isHome={useLocation().pathname === '/'} />
    <main className='flex contenido'>
      <Outlet />
    </main>
    <Footer />
  </>
)

export default DragonBall
