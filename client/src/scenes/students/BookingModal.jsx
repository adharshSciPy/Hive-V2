import React, { useEffect, useState } from 'react'
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

const BookingModal = ({ isOpen, setIsOpen, modalData }) => {

    const dateFormat = 'DD-MM-YYYY';
    const today = moment(Date.now()).format(dateFormat)
    const lastDayOfMonth = moment().endOf('month').format(dateFormat);

    const [date, setDate] = useState(dayjs(today))
    const [timeRange, setTimeRange] = useState(dayjs(today))
    const [isDisabled, setIsDisabled] = useState(true)

    const handleDate = (date) => {
        console.log('date', date)
    }

    const handleTimeRange = (timeRange) => {
        console.log('time', timeRange)
    }

    useEffect(() => {
        if (date && timeRange) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    }, [date, timeRange])

    if (!isOpen) {
        return null
    }
    return (
        <>
            <div className="overflow-y-auto bg-blue-200 backdrop-blur-sm bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-baseline justify-between p-2 px-5 border-b rounded-t">
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Confirm Booking in</p>
                            </div>

                            <div className='ml-1 flex items-baseline justify-between gap-1'>
                                <p className='text-md font-medium text-blue-700'>{modalData?.slotDetails?.slotNo}</p>
                                <p className='text-sm font-medium text-gray-600'>slot in</p>
                            </div>

                            <div className="ml-1 flex">
                                <div className='w-50 flex items-baseline justify-between gap-1'>
                                    <p className='text-md font-medium text-blue-700'>{modalData?.floor}</p>
                                    <p className='text-sm font-medium text-gray-600'>floor</p>
                                </div>
                            </div>

                            <button onClick={() => setIsOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* modal body */}
                        <div className="p-4 md:p-5 block md:flex">
                            <div className='w-full mb-5 md:m-0'>
                                <label for="large-input" className="mb-2 block text-sm font-medium text-gray-600">Select Date</label>
                                <DatePicker
                                    className='text-gray-600'
                                    value={date}
                                    defaultValue={date}
                                    onChange={handleDate}
                                    format={dateFormat}
                                    minDate={dayjs(today)}
                                    maxDate={dayjs(lastDayOfMonth)}
                                />
                            </div>
                            <div className='w-full'>
                                <label for="large-input" className="mb-2 block text-sm font-medium text-gray-600">Select Time Range</label>
                                <TimePicker.RangePicker
                                    className='text-gray-600'
                                    value={timeRange}
                                    defaultValue={timeRange}
                                    onChange={handleTimeRange}
                                    minDate={dayjs(today)}
                                    maxDate={dayjs(lastDayOfMonth)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button
                                type="button"
                                disabled={isDisabled}
                                className={`text-white ${isDisabled ? 'bg-zinc-300' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600`}>Book</button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-blue-800 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingModal