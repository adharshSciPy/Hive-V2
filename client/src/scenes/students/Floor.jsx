import React from 'react'
import { RemainingTime } from '../../components'
import clock from '../../assests/clock.png'

const Floor = ({ item, setIsOpen, setModalData }) => {

    const handleOnClick = (slot) => {
        setIsOpen(true)
        let data = {
            floor: item?.floor,
            slotDetails: slot
        }
        setModalData(data)
    }

    return (
        <div className="min-h-44 h-auto mt-6 border rounded-lg border-black-100 hover:shadow-md transition duration-100 ease-in delay-200 p-2">
            <span class="inline-block bg-blue-300 px-2 py-1 text-xs font-medium text-blue-600 rounded-t-lg">Floor no {item?.floor}</span>
            <div className='mt-2 flex items-center justify-center md:justify-start flex-wrap gap-1'>
                {item?.slots?.map((item, index) => (
                    <div key={index} className={`h-20 w-40 rounded-md ${item?.isFilled ? 'bg-red-200' : 'bg-green-200'} relative`}>
                        <p className='text-sm mx-2 mt-1'> Slot no {item?.slotNo}</p>
                        {item?.isFilled ? (
                            <div className='absolute bottom-0 left-0 w-full flex gap-3 items-center px-5 pb-2'>
                                <img src={clock} alt="clock-icon" className='h-6' />
                                <p className='h-5 text-sm text-center'>{<RemainingTime startTimestamp={item?.duration[0]} endTimestamp={item?.duration[1]} />}</p>
                            </div>
                        ) : (
                            <button onClick={() => handleOnClick(item)} className='absolute bottom-0 left-0 w-full h-7 text-sm bg-green-400 hover:bg-green-600 text-white'>Book</button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Floor