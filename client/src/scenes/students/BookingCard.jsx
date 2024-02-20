import React from 'react'
import clock from '../../assests/clock.png'

const BookingCard = ({ bookings }) => {
    return (
        <div className={`${bookings?.parked ? 'bg-green-50 ring-1 ring-white border-none' : 'bg-white'} min-h-44 min-w-80 md:min-w-40 w-[40%] md:w-[30%] h-auto mt-6 border rounded-lg border-black-100 hover:shadow-md transition duration-100 ease-in delay-200 p-2 flex flex-col items-start justify-between`}>
            <div className='w-full flex items-center justify-between'>
                <div class={`px-2 inline-flex items-center rounded-md ${bookings?.parked ? 'bg-red-50 text-red-700 ring-red-700/10' : 'bg-blue-50 text-blue-700 ring-blue-700/10'} px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10`}>
                    {bookings?.parked ? 'You Parked' : 'Reserved'}
                </div>
                {
                    !bookings?.parked
                    &&
                    <>
                        <button className='h-5 w-5 ring-1 bg-blue-50 rounded-sm ring-blue-200 flex p-1 items-center justify-between overflow-hidden'>
                            <i className="fa fa-pen text-xs text-blue-300 hover:text-blue-600"></i>
                        </button>
                    </>
                }
            </div>

            <div className='flex gap-2 items-center justify-between'>
                <div className='flex items-baseline gap-2'>
                    <p className='text-sm text-gray-600'>Floor</p>
                    <p className='text-xl text-blue-500 font-bold'>{bookings.floor}</p>
                </div>

                <div className='flex items-baseline gap-2'>
                    <p className='text-sm text-gray-600'>Slot</p>
                    <p className='text-xl text-blue-500 font-bold'>{bookings.slot}</p>
                </div>
            </div>

            <div className='flex flex-col items-baseline'>
                <p className='text-sm font-bold text-gray-500'>{bookings.duration[0]} to {bookings.duration[1]}</p>
                <p className='text-xs font-extralight text-gray-600'>{bookings.date}</p>
            </div>

            {
                bookings?.parked ?
                    <>
                        <div className='flex items-center gap-2'>
                            <img src={clock} alt="clock-icon" className='h-4' />
                            <p className='text-xs text-blue-900'>2 hours remains</p>
                        </div>
                        <button className='w-full bg-blue-400 hover:bg-blue-500 text-white p-1 text-xs rounded mt-1'>Extend Time</button>
                    </>
                    :
                    <button className='w-full bg-red-400 hover:bg-red-500 text-white p-1 text-xs rounded mt-1'>Cancel</button>
            }
        </div>
    )
}

export default BookingCard