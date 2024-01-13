import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Details from './Pages/Details/Details'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import BookingForm from './Pages/BookingForm/BookingForm'
// import Thanks from './Pages/ThankYou/Thanks'

import Properties from './Pages/Properties/Properties'
import {  ToastContainer } from 'react-toastify'
import ContactUs from './Pages/ContactUs/ContactUs'
import { useEffect } from 'react'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/properties/:id' element={<Details/>} />
      <Route path='/booking-form' element={<BookingForm/>} />
      {/* <Route path='/thank-you' element={<Thanks/>} /> */}
      <Route exact path='/' element={<Home/>} />
      <Route path='/properties' element={<Properties/>} />
      <Route path='/contact-us' element={<ContactUs/>} />
    </Routes>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
