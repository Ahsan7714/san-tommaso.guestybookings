import bg from '../../assets/vilabga.jpg'
import DatePicker from '../../Components/DatePicker/DatePicker'
import About from '../../Components/About/About'
import Contact from '../../Components/Contact/Contact'
import { useEffect } from 'react'
import { useLocalContext } from '../../context/contextProvider'

const Home = () => {
  const {getProperties}=useLocalContext()
  useEffect(() => {
    getProperties();
  }, []); 
   return (
    <div>
      <div className=' font-poppins'>
        <div className='bg-[#00000040] z-10'>
        <img src={"./images/IMG_4153.jpg"} alt="" className='relative h-[70vh] lg:h-[100vh] w-full object-cover -z-10' />
        </div>
        <div className='absolute lg:top-[50%] text-white lg:left-[23%] top-[29%] text-center'>
        <h1 className='text-[40px] font-bold'>Booking Agriturismo San Tommaso</h1>
        <p className='text-[25px] font-semibold absolute lg:left-[40%] left-[29%]'>Enjoy your stay</p>
        </div>
        <div className=''>
        <div className='  -translate-y-16  shadow-2xl w-fit mx-auto'>
          <DatePicker source={"Home"}/>
        </div>
      </div>
      <About/>
      <Contact/>
    </div>
    </div>
  )
}

export default Home