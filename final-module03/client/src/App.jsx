import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Home from '../src/component/Home'
import Login from '../src/component/Login'
import Register from '../src/component/Register'


export default function App() {
  return (
    <>
    <nav>
      <ul>
        <li><Link to='/home'> home</Link></li>
        <li><Link to='/Login'> login</Link></li>
        <li><Link to='/Register'> register</Link></li>
      </ul>
    </nav>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
        </Routes>
    </>
    
  )
}
