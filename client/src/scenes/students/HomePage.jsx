import React, { useState } from 'react'
import Floor from './Floor'
import { motion } from "framer-motion";
import BookingModal from './BookingModal';
import { getUpdatedDuration } from '../../utils/Uihelpers';

const floorAndSlots = [
  {
    floor: 1,
    slots: [
      { slotNo: 1, isFilled: true, duration: getUpdatedDuration(0, 90) }, // 1.5 hours duration
      { slotNo: 2, isFilled: false },
      { slotNo: 3, isFilled: false },
      { slotNo: 4, isFilled: true, duration: getUpdatedDuration(90, 180) }, // 1.5 hours duration
      { slotNo: 5, isFilled: true, duration: getUpdatedDuration(180, 270) }, // 1.5 hours duration
      { slotNo: 6, isFilled: false },
      { slotNo: 7, isFilled: false },
    ]
  },
  {
    floor: 2,
    slots: [
      { slotNo: 1, isFilled: true, duration: getUpdatedDuration(60, 150) }, // 1.5 hours duration
      { slotNo: 2, isFilled: true, duration: getUpdatedDuration(150, 240) }, // 1.5 hours duration
      { slotNo: 3, isFilled: false },
      { slotNo: 4, isFilled: false },
      { slotNo: 5, isFilled: true, duration: getUpdatedDuration(240, 330) }, // 1.5 hours duration
      { slotNo: 6, isFilled: false }
    ]
  },
  {
    floor: 3,
    slots: [
      { slotNo: 1, isFilled: false },
      { slotNo: 2, isFilled: false },
      { slotNo: 3, isFilled: true, duration: getUpdatedDuration(90, 180) }, // 1.5 hours duration
      { slotNo: 4, isFilled: false },
      { slotNo: 5, isFilled: true, duration: getUpdatedDuration(180, 270) }, // 1.5 hours duration
      { slotNo: 6, isFilled: false },
      { slotNo: 7, isFilled: false },
      { slotNo: 8, isFilled: true, duration: getUpdatedDuration(270, 360) }, // 1.5 hours duration
      { slotNo: 9, isFilled: false }
    ]
  },
  {
    floor: 4,
    slots: [
      { slotNo: 1, isFilled: true, duration: getUpdatedDuration(30, 120) }, // 1.5 hours duration
      { slotNo: 2, isFilled: true, duration: getUpdatedDuration(120, 210) }, // 1.5 hours duration
      { slotNo: 3, isFilled: true, duration: getUpdatedDuration(210, 300) }, // 1.5 hours duration
      { slotNo: 4, isFilled: true, duration: getUpdatedDuration(300, 390) }, // 1.5 hours duration
      { slotNo: 5, isFilled: true, duration: getUpdatedDuration(390, 480) }, // 1.5 hours duration
      { slotNo: 6, isFilled: true, duration: getUpdatedDuration(480, 570) }, // 1.5 hours duration
      { slotNo: 7, isFilled: false },
    ]
  }
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState()

  return (

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full min-h-screen bg-red-100 bg-gradient-to-b from-white to-blue-200 py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 xl:text-xl'>
      <p className='mt-10 text-stone-600'>Parking Slots</p>

      {
        floorAndSlots.map((item, index) => {
          return (
            <Floor item={item} setIsOpen={setIsOpen} setModalData={setModalData} key={index} />
          )
        })
      }

      <BookingModal isOpen={isOpen} setIsOpen={setIsOpen} modalData={modalData} />
    </motion.section>
  )
}

export default HomePage