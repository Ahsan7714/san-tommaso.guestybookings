import bg from '../../assets/vilabg.jpg'
import DatePicker from '../../Components/DatePicker/DatePicker'
import About from '../../Components/About/About'
import Contact from '../../Components/Contact/Contact'

const Home = () => {
  return (
    <div>
      <div>
        <img src={bg} alt="" className='relative h-[100vh] lg:h-[120vh] w-full object-cover' />
        <div className='absolute lg:top-[60%] text-white lg:left-[28%] top-[40%] text-center'>
        <h1 className='text-[40px] font-bold'>Booking Agriturismo San Tommaso</h1>
        <p className='text-[25px] font-semibold absolute lg:left-[40%] left-[29%]'>Enjoy your stay</p>
        </div>
        <div className='  -translate-y-16  shadow-2xl w-fit mx-auto'>
          <DatePicker/>
        </div>
      </div>
      <About/>
      <Contact/>
    </div>
  )
}

export default Home