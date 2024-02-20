import React from 'react'
import { motion } from "framer-motion";
import hero from '../../assests/hero.png'

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full md:h-screen min-h-screen bg-red-100 bg-gradient-to-b from-white to-violet-200 py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 xl:text-xl'>
      <div className="mt-20 md:mt-0 h-full w-full md:flex flex-col-reverse md:flex-row items-center justify-between">

        {/* hero text */}
        <div className='h-full flex-1 flex flex-col items-center md:items-start justify-center'>
          <p className='md:text-4xl text-zinc-700 font-bold mb-2'>Join the Buzz of</p>
          <p className='text-4xl md:text-7xl  text-violet-500 font-semibold hover:text-violet-600 mb-12'>Online Learning </p>
          <p className='text-xl md:text-4xl text-zinc-700 font-semibold hover:text-violet-600'>HIVE</p>
          <p className='text-md font-thin text-zinc-700'>The Ultimate Social Media Platform for Students!.</p>
        </div>

        {/* hero image */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center">
          <img src={hero} alt="hero-section" />
        </div>
      </div>
    </motion.div>
  )
}

export default LandingPage
