import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from "framer-motion";

const PublicLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full md:h-screen w-full bg-red-100 bg-gradient-to-b from-white to-violet-200 py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 xl:text-xl'>
      <Outlet />
    </motion.div>
  )
}

export default PublicLayout