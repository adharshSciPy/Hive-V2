import React from 'react'
import { motion } from "framer-motion";
import { GroupButton } from '../../components';

const AdminUsers = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full min-h-screen bg-red-100 bg-gradient-to-b from-white to-blue-200 py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 xl:text-xl'>
      <p className='mt-10 text-stone-600'>Total Users</p>


      <div className='min-h-[60%] h-auto w-full mx-auto mt-10'>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs text-white-700 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Floor
                </th>
                <th scope="col" className="px-6 py-3">
                  Slot
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Manoj
                </th>
                <td className="px-6 py-4">
                  manoj@gmail.com
                </td>
                <td className="px-6 py-4">
                  1
                </td>
                <td className="px-6 py-4">
                  2
                </td>
                <td className="px-6 py-4">
                  05:20 AM - 06:20 AM
                </td>
                <td className="px-6 py-4">
                  14-02-2024
                </td>
                <td className="px-6 py-4">
                  1 hour
                </td>
                <td className="px-6 py-4 m-1">
                  <GroupButton />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Renjith
                </th>
                <td className="px-6 py-4">
                  renjith@gmail.com
                </td>
                <td className="px-6 py-4">
                  3
                </td>
                <td className="px-6 py-4">
                  7
                </td>
                <td className="px-6 py-4">
                  04:20 AM - 06:20 AM
                </td>
                <td className="px-6 py-4">
                  14-02-2024
                </td>
                <td className="px-6 py-4">
                  2 hours
                </td>
                <td className="px-6 py-4 m-1">
                  <GroupButton />
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Rahul
                </th>
                <td className="px-6 py-4">
                  rahul@gmail.com
                </td>
                <td className="px-6 py-4">
                  1
                </td>
                <td className="px-6 py-4">
                  5
                </td>
                <td className="px-6 py-4">
                  05:20 AM - 09:20 AM
                </td>
                <td className="px-6 py-4">
                  17-02-2024
                </td>
                <td className="px-6 py-4">
                  4 hour
                </td>
                <td className="px-6 py-4 m-1">
                  <GroupButton />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  )
}

export default AdminUsers