import React, { useEffect, useState } from 'react'

const Day = ({day, weather, mood, number, description}) => {
    const dayIsPastOrPresent = () => {
        if (new Date(oldDate.toDateString())) {
            
        }
    }

    const setUserDay = () => {
        // let the user set a day if it is present day or in the past
        // no future stuff can be added (for now)
        if (dayIsPastOrPresent()) {
            
        }
    }
    
  return (
        <li className='day'>
            <p>{day}</p>
            {/* animated svgs on hover */}
            {/* <img src={`../images/${weather}`} />
            <img src={`../images/${mood}`} alt="" /> */}
            <p>Mood Intensity: {number}</p>
            {
                weather && (
                    <>
                        <p>{weather[1]}°F</p>
                        <p>
                            {weather[0].description}
            
                            <img src={weather[0].image} alt="" />
                        </p>
                    </>
                )
            }
            <p>Mood: {mood}</p>
            <p name="description" id="">Description: {description}</p>
        </li>
    )
};

export default Day;