import React from 'react'
import { Toaster as Notify } from 'react-hot-toast';

const Toaster = () => {
    return (
        <Notify 
            toastOptions={{
                className: 'toastStyle',
                duration: 1500,
                limit: '1',
                style: {
                    background: 'rgb(27, 87, 155)',
                    color: '#fff',
                    height: '2.5rem',
                    marginTop: '5rem'
                },
            }}
        />
    )
}

export default Toaster