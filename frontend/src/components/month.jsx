import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from '../constants';
import Day from './day';



// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weatherCodes = {
    0:{
        "description":"Clear",
        "image":"http://openweathermap.org/img/wn/01d@2x.png"
	},

    1:{
        "description":"Mainly Sunny",
        "image":"http://openweathermap.org/img/wn/01d@2x.png"
	},

    2:{
        "description":"Partly Cloudy",
        "image":"http://openweathermap.org/img/wn/02d@2x.png"
	},

	3:{	
        "description":"Cloudy",
        "image":"http://openweathermap.org/img/wn/03d@2x.png"
	},

	45:{	
        "description":"Foggy",
        "image":"http://openweathermap.org/img/wn/50d@2x.png"
	},

	48:{	
        "description":"Rime Fog",
        "image":"http://openweathermap.org/img/wn/50d@2x.png"
	},

	51:{	
        "description":"Light Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	53:{	
        "description":"Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	55:{	
        "description":"Heavy Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	56:{	
        "description":"Light Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	57:{	
        "description":"Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	61:{	
        "description":"Light Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
	},

	63:{	
        "description":"Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
	},

	65:{	
        "description":"Heavy Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
	},

	66:{	
        "description":"Light Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
	},

	67:{	
        "description":"Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
	},

	71:{	
        "description":"Light Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	73:{	
        "description":"Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	75:{	
        "description":"Heavy Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	77:{	
        "description":"Snow Grains",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	80:{	
        "description":"Light Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	81:{	
        "description":"Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	82:{	
        "description":"Heavy Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
	},

	85:{	
        "description":"Light Snow Showers",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	86:{	
        "description":"Snow Showers",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
	},

	95:{	
        "description":"Thunderstorm",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
	},

	96:{	
        "description":"Light Thunderstorms With Hail",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
	},

	99:{	
        "description":"Thunderstorm With Hail",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
	}
}

const formatDateNumber = (number) => ('0' + number).slice(-2);

const Month = () => {
    const calendarContainerRef = useRef();
    const monthRef = useRef();
    const leftArrowRef = useRef();
    const rightArrowRef = useRef();

    const [month, setMonth] = useState([]);

    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    
    const [currentSetDate, setCurrentSetDate] = useState(new Date());

    useEffect(() => {
        const resizeDiv = () => {
            const elementDimensions = calendarContainerRef.current.getBoundingClientRect();

            calendarContainerRef.current.style.height = elementDimensions.width + "px";
        }
        
        resizeDiv();
        window.addEventListener("resize", resizeDiv);
    }, []);

    async function loadMonthData() {
        const year = currentSetDate.getFullYear();
        const month = currentSetDate.getMonth();

        // if we are in the current month and current year, then we will only get weather from beginning of current month to current day of month
        let lastDayOfMonth = month === new Date().getMonth() && year === new Date().getFullYear() ?  new Date().getDate() : new Date(year, month + 1, 0).getDate();

        try {
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=40.6259&longitude=-75.3705&daily=weather_code,temperature_2m_max&&temperature_unit=fahrenheit&timezone=America%2FNew_York&start_date=${year}-${formatDateNumber(month + 1)}-01&end_date=${year}-${formatDateNumber(month + 1)}-${formatDateNumber(lastDayOfMonth)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            
            if (weatherResponse.ok) {
                const weatherData = await weatherResponse.json();

                loadUserDays(weatherData);
            } else {
                // continue loading userDays without the weather
                loadUserDays();

                weatherResponse.json().then((e) => {
                    throw e.reason;
                });
            }
        } catch (e) {
            setError("An error occured!");
            console.log("An error occurred:", e);
        } finally {
            setLoading(false);
        }

        async function loadUserDays(weatherdata = undefined) {
            try {
                const userResponse = await fetch(`${API_URL}days`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
    
                if (userResponse.ok) {
                    const userData = await userResponse.json();
    
                    manipulate(userData, weatherdata);
                } else {
                    throw userResponse;
                }
            } catch (e) {
                setError("An error occured!");
                console.log("An error occurred:", e);
            } finally {
                setLoading(false);
            }
        }
    }

    const changeMonth = (e) => {
        const monthNum = e.currentTarget.id === "calendar-prev" ? currentSetDate.getMonth() - 1 : currentSetDate.getMonth() + 1;

        let newDate;
 
        // Check if the month is out of range
        if (monthNum < 0 || monthNum > 11) {
 
            // Set the date to the first day of the 
            // month with the new year
            newDate = new Date(currentSetDate.getFullYear(), monthNum, new Date().getDate());
        } else {
            // Set the date to the current date
            newDate = new Date(currentSetDate.getFullYear(), monthNum);
        }
 
        // Call the manipulate function to 
        // update the calendar display
        setCurrentSetDate(newDate);
    }

    // Function to generate the calendar
    const manipulate = (userData, userWeather) => {
        const currentNewYear = currentSetDate.getFullYear();
        const currentNewMonth = currentSetDate.getMonth();

        // Get the first days of the month; inactive days from prev month
        let firstDays = new Date(currentNewYear, currentNewMonth, 1).getDay();
        
        // Get the last date of the month
        let lastDay = new Date(currentNewYear, currentNewMonth + 1, 0).getDate();
        
        // Get the day of the last date of the month
        let currentNewMonthLastDay = new Date(currentNewYear, currentNewMonth, lastDay).getDay();
        
        // Get the last date of the previous month
        let monthLastDate = new Date(currentNewYear, currentNewMonth, 0);
        let prevMonthLastDay = monthLastDate.getDate();
        
        // Variable to store the generated calendar HTML
        let monthDays = [];
        
        // 1. Loop to add the last dates of the previous month
        for (let i = firstDays; i > 0; i--) {
            monthDays.push(<li key={months[monthLastDate.getMonth()] + "-" + (prevMonthLastDay - i + 1)} className="inactive"><p>{prevMonthLastDay - i + 1}</p></li>);
        }
        
        // 2. Loop to add the dates of the current month
        for (let i = 1; i <= lastDay; i++) {
            // Check if the current date is today
            let isToday = i === new Date().getDay() && currentNewMonth === new Date().getMonth() && currentNewYear === new Date().getFullYear() ? "active" : "";

            const weather = userWeather && (userWeather.daily.weather_code[i - 1] || userWeather.daily.weather_code[i - 1] === 0) ? [weatherCodes[userWeather.daily.weather_code[i - 1]], userWeather.daily.temperature_2m_max[i - 1]] : undefined;

            if (userData[i - 1]) {
                const {mood, number, description} = userData[i - 1];

                monthDays.push(
                    <Day key={months[currentNewMonth] + "-" + i} day={i} weather={weather} mood={mood} number={number} description={description}/>
                );
            } else {
                monthDays.push(<li key={months[currentNewMonth] + "-" + i} className={`${isToday}`}>
                    <p>{i}</p>
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
                </li>);
            }
        }

        // 3. Loop to add the first dates of the next month
        for (let i = currentNewMonthLastDay; i < 6; i++) {
            monthDays.push(<li key={months[currentNewMonth + 1] + "-" + (i - currentNewMonthLastDay + 1)} className="inactive"><p>{i - currentNewMonthLastDay + 1}</p></li>);
        }

        setMonth(monthDays);
    }

    useEffect(() => {
        loadMonthData();
    },
     [currentSetDate])

    return (
        <div className="calendar-container" ref={calendarContainerRef}>
            <header className="calendar-header">
                <p className="calendar-current-date">{months[currentSetDate.getMonth()]} {currentSetDate.getFullYear()}</p>
                <div className="calendar-navigation">
                    <span onClick={changeMonth} ref={leftArrowRef} id="calendar-prev" className="material-symbols-rounded">{"<"}</span>
                    <span onClick={changeMonth} ref={rightArrowRef} id="calendar-next" className="material-symbols-rounded">{">"}</span>
                </div>
            </header>
    
            <div className="calendar-body">
                <ul className="calendar-weekdays">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul ref={monthRef} className="calendar-dates">{month}</ul>
            </div>
        </div>
    )
};

export default Month;