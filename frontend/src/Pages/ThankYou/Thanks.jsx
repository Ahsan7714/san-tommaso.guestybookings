import React from 'react'
import thanks from "../../assets/thanks.png"
import { Link } from 'react-router-dom'

const Thanks = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-[#fafafa] mt-24 gap-5 pb-6'>
      <img src={thanks} alt="" className='h-[300px]' />
      <h1 className='text-[#10275b] text-[30px] font-bold'>Thank you for reaching out!</h1>
      <p className=''>Someone from oue team will be in touch soon to help you to complete the reservation.</p>
      <Link to="/" className="bg-[#9d155c] text-white h-[45px] w-[20%]" >
              <button className="bg-[#9d155c] text-white text-[20px] font-semibold h-[45px] w-[100%]">
              Browse more properties
              </button>
              </Link>
    </div>
  )
}

export default Thanks