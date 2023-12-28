import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Properties from './Pages/Properties/Properties'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/properties' element={<Properties/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
