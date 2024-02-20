import React from 'react'
import { motion } from 'framer-motion'
import { generateTimeDurations } from '../../utils/Uihelpers';
import BookingCard from './BookingCard';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';
const today = moment(Date.now()).format(dateFormat)

const customToday = moment().format(dateFormat)
const myBookings = [
  { floor: 1, slot: 5, date: today, duration: [], parked: true },
  { floor: 7, slot: 2, date: today, duration: [] },
  { floor: 3, slot: 1, date: today, duration: [] },
  { floor: 5, slot: 2, date: today, duration: [] }
];

const timeDurations = generateTimeDurations(customToday);
myBookings.forEach(booking => {
  booking.duration = [timeDurations.split(' - ')[0], timeDurations.split(' - ')[1]];
});

const Bookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full min-h-screen bg-red-100 bg-gradient-to-b from-white to-blue-200 py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 xl:text-xl'>
      <p className='mt-10 text-stone-600'>Bookings</p>

      <div className='h-100 w-100 flex flex-wrap items-center justify-center md:justify-between gap-2'>
        {
          myBookings.map((bookings, index) => {
            return (
              <BookingCard bookings={bookings} key={index} />
            )
          })
        }
      </div>
    </motion.div>
  )
}

export default Bookings