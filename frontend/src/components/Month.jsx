import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants';
import Day from './Day';

const Month = () => {
    const [days, setDays] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadDays() {
            try {
                const response = await fetch(API_URL);
                if (response.ok) {
                    const json = await response.json();

                    set
                } else {
                    throw response;
                }
            } catch (e) {
                setError("An error occured!");
                console.log("An error occurred:", e);
            } finally {
                setLoading(false);
            }
        }

        loadDays();
    }, [])

  return (
    <ul className='month'>{
        days.map((day, index) => <Day number={number + 1} weather={day.weather} mood={day.mood}/>)
    }</ul>
  )
};

export default Month;