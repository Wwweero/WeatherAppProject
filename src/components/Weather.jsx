import React, { useEffect, useRef, useState } from 'react'
import {motion} from "framer-motion"
import './Weather.css'
import help_icon from '../assets/help_w.png'
import search_icon from '../assets/searchoption.png'
import clear_icon from '../assets/clear.png'
import clearn_icon from '../assets/clear_night.png'
import cloud_icon from '../assets/cloud.png'
import cloudn_icon from '../assets/cloudy-night.png'
import drizzle_icon from '../assets/drizzle.png'
import drizzlen_icon from '../assets/rainn.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import rainn_icon from '../assets/rainn.png'
import snow_icon from '../assets/snow.png'
import snown_icon from '../assets/snow_night.png'
import thundern_icon from '../assets/thunderstorm.png'
import sunny_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'




const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const[loading, setLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    

    

    const allIcons = {
        "01d": clear_icon,
        "01n": clearn_icon,
        "02d": cloud_icon,
        "02n": cloudn_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzlen_icon,
        "09d": rain_icon,
        "09n": rainn_icon,
        "10d": rain_icon,
        "10n": rainn_icon,
        "11d": rain_icon,
        "11n": thundern_icon,
        "13d": snow_icon,
        "13n": snown_icon,



    }


    


    const search = async (city) =>{

        if(city === ""){
            alert("Please enter a city name");
            return;
        }

        setLoading(true);
        
        try{
            const url = `https://weatherappproject-bzl0.onrender.com/weather?city=${city}`;


            const response = await fetch(url); 
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                setLoading(false);
                return;
            }
            console.log(data); //Shows data in the console
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                feelsLike: Math.floor(data.main.feels_like),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Unable to fetch weather data. Try again later.");
        } finally {
            setLoading(false);
        }

           
    
    };

    

    useEffect(()=>{
        search("London");

    },[]); 


    
    
    

  return (
    <motion.div 
    className='weather'
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.5}}
    
    >


        <motion.div 
        className="search-bar"
        initial={{y: -20}}
        animate={{y: 0}}
        transition={{duration: 0.5}}
        
        >

            <input ref={inputRef} type="text" placeholder='Search City'onKeyDown={(event)=>{ if (event.key=== 'Enter'){search(inputRef.current.value);}}}/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </motion.div>

        {showHelp && (
                    <div className="help-popup">
                        <p> Need help? If the app is not working:</p>
                        <ul>
                            <li>✔ Check your internet connection.</li>
                            <li>✔ Give it a minute to load.</li>
                            <li>✔ Try searching for a valid city name.</li>
                            <li>✔ If the weather isn't loading, the API may be down.</li>
                        </ul>

                        <p className="contact-text">
                            ✉️ Still need help? <br/>
                            <a href="mailto:weronikapackow@weatherapp.com" className="contact-link">Contact Us</a>

                        </p>
                        <button className="close-btn" onClick={() => setShowHelp(false)}>Close</button>
                    </div> )}


    {loading && (<p className="loading-text">Loading...</p>)}

    {weatherData && (
    <>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className="feels-like">Feels Like {weatherData.feelsLike}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="column">
                <img src={humidity_icon} alt=""/>
                <div>
                    <p> {weatherData.humidity}% </p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="column">
                <img src={wind_icon} alt=""/>
                <div>
                    <p> {weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>

    </>
        )}

        <img src={help_icon} alt="Help" className="help-icon" onClick={() => setShowHelp(true)}/>

        <footer className="footer">
            <p> © {new Date().getFullYear()}WeatherApp. All rights reserved. </p>
        </footer>

    </motion.div>  );



}



export default Weather
