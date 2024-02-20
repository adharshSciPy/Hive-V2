import React, { useState, useEffect } from 'react';

const RemainingTime = ({ startTimestamp, endTimestamp }) => {
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime();
            const endTime = new Date(endTimestamp).getTime();

            let remainingTime = endTime - currentTime;

            // Ensure remaining time is non-negative
            remainingTime = Math.max(remainingTime, 0);

            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            remainingTime %= (1000 * 60 * 60);
            const minutes = Math.floor(remainingTime / (1000 * 60));
            remainingTime %= (1000 * 60);
            const seconds = Math.floor(remainingTime / 1000);

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setRemainingTime(formattedTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endTimestamp]);

    return (
        <div>
            <p>{remainingTime}</p>
        </div>
    );
};

export default RemainingTime;
