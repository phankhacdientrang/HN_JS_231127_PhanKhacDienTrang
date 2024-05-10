import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UpdateBook from './components/UpdateBook'
import ListBook from './components/ListBook'
import DeleteBook from './components/DeleteBook'
import AddBook from './components/AddBook'
import './css/App.css'

export default function App() {
  return (
   <>
   <div>
    <nav>
    <ul>
      <li><Link to='/updatebook'>Update Book</Link></li>
      <li><Link to='/listbook'>List Book</Link></li>
      <li><Link to='/deletebook'>Delete Book</Link></li>
      <li><Link to='/addbook'>Add Book</Link></li>
    </ul>
   </nav>
   <Routes>
    <Route path='/updatebook' element={<UpdateBook/>}/>
    <Route path='/listbook' element={<ListBook/>}/>
    <Route path='/deletebook' element={<DeleteBook/>}/>
    <Route path='/addbook' element={<AddBook/>}/>
   </Routes>
   </div>
   </>
  )
}
