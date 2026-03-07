import './style.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DragonBall from './DragonBall'
import Character from './pages/Character'
import Error from './pages/Error'
import Home from './pages/Home'
import Saga from './pages/Saga'
import strings from './utils/strings'

document.title = strings.PAGE_TITLE
document.querySelector('meta[name="author"]').content = strings.AUTHOR_FULLNAME

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DragonBall />}>
          <Route index element={<Home />} />
          <Route path=':sagaId' element={<Saga />} />
          <Route path=':sagaId/:characterId' element={<Character />} />
          <Route
            path='*'
            element={<Error errorMsg={strings.ERROR_MSG.page} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
