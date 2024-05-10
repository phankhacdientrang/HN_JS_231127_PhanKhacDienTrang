import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UpBook from '../src/components/UpBook'
import List from '../src/components/List'
import Delete from '../src/components/DeleteBook'
import Addbook from '../src/components/AddNewBook'
import './App.css'
export default function App() {
  return (
   <>
   <div>
    <nav>
    <ul>
      <li><Link to='/upbook'>Upbook</Link></li>
      <li><Link to='/list'>List</Link></li>
      <li><Link to='/delete'>Delete</Link></li>
      <li><Link to='/addbook'>Add New Book</Link></li>
    </ul>
   </nav>
   <Routes>
    <Route path='/upbook' element={<UpBook/>}/>
    <Route path='/list' element={<List/>}/>
    <Route path='/delete' element={<Delete/>}/>
    <Route path='/addbook' element={<Addbook/>}/>
   </Routes>
 
   </div>
     
   </>
  )
}
