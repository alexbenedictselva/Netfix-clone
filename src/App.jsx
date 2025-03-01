import React from 'react'
// import Home from './pages/Home/Home'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home/Home'
import Login from './pages/Home/Login/Login'
import Player from './pages/Home/Player/Player'
import Details from './pages/Home/Details/Details'
import Navbar from './components/Navbar/Navbar/Navbar'
const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
