import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/component/navbar.jsx'
import Home from '../src/pages/Home.jsx'
import Register from '../src/pages/Register.jsx'
import Login from '../src/pages/Login.jsx'


function App() {


  return (
    <>
      {/* <h1> Url Shortener </h1> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
