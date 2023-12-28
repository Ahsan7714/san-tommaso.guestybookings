import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Details from './Pages/Details/Details'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import BookingForm from './Pages/BookingForm/BookingForm'
import Thanks from './Pages/ThankYou/Thanks'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/details' element={<Details/>} />
      <Route path='/booking-form' element={<BookingForm/>} />
      <Route path='/thank-you' element={<Thanks/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
