import React, { useEffect, useState } from 'react'
import { GiDandelionFlower } from "react-icons/gi";
import { TbSettings } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';

function App() {

  const [city, setCity] = useState("siwan");
  const [weather, setWeather] = useState(null);

  const api = (cityName) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no`).then((d) => {
      // console.log(d.data);
      setWeather(d.data);
    })
  };

  useEffect(() => {
    api(city)
  }, [])



  return (
    <div className='bg-[#02012B] min-h-screen w-full text-white overflow-hidden pb-10'>
      <div className='px-15 py-10 flex justify-between header'>
        <p className='flex px-2 py-1 gap-1 text-center font-medium'><GiDandelionFlower className='text-yellow-400  text-2xl' />Weather Now</p>
        <p className='flex gap-2 rounded bg-amber-100/30 px-2 py-1'><TbSettings className='mt-1' /> Units <FaChevronDown className='mt-1' /></p>
      </div>
      <div className='pb-12 text-center font-mono text-4xl font-bold'>How's the sky looking today?</div>

      <div className='flex gap-5 justify-center pb-10 search-container'>
        <p className='relative'><IoIosSearch className='absolute left-3.5 top-4' /><input type="text" name="" id="" onChange={(e) => { setCity(e.target.value) }} placeholder='Search for a place...' className='rounded-lg bg-amber-100/30 px-10 py-3 w-96' /></p>
        <button className='bg-blue-700 font-medium px-5 py-3 rounded-lg ' onClick={() => api(city)}>Search</button>
      </div>

      <div className=' flex gap-5 data-container items-stretch mx-20'>
        <div className=' w-3/5 left-container'>
          <div className='bg-linear-to-r from-cyan-500 to-blue-500/60 px-5 py-20 flex justify-between rounded-2xl abc'>
            <div className=' flex flex-col justify-center fnt-2 '>
              <p className='text-3xl font-medium '>{weather?.location.name}, {weather?.location.region}</p>
              <p className='text-sm opacity-75'>
                {new Date(weather?.forecast?.forecastday?.[0]?.date)
                  .toLocaleDateString("en-US", { weekday: "long" })}, {weather?.forecast?.forecastday?.[0]?.date}
              </p>
            </div>
            <div className='flex items-center gap-5'>
              <div className='text-lg opacity-75  flex flex-col text-center'><img src={weather?.current?.condition.icon} alt="" className='w-20' /><p className="w-20">{weather?.current?.condition.text}</p></div>
              <p className='text-8xl font-medium fnt-1'>{weather?.current?.temp_c}°C</p>
            </div>
          </div>

          <div className='mt-7 flex justify-evenly gap-2 tabs-1'>
            <div className='p-5 flex-1 rounded-xl bg-amber-100/20 aa'><p className='text-xl opacity-60 mb-4'>Feel_Like</p><p className='text-3xl'>{weather?.current?.feelslike_c}°C</p></div>
            <div className='p-5 flex-1 rounded-xl bg-amber-100/20 aa'><p className='text-xl opacity-60 mb-4'>Humidity</p><p className='text-3xl'>{weather?.current?.humidity}%</p></div>
            <div className='p-5 flex-1 rounded-xl bg-amber-100/20 aa'><p className='text-xl opacity-60 mb-4'>Pressure</p><p className='text-3xl'>{weather?.current?.pressure_in}</p></div>
            <div className='p-5 flex-1 rounded-xl bg-amber-100/20 aa'><p className='text-xl opacity-60 mb-4'>Wind</p><h1 className='text-3xl flex gap-2'>{weather?.current?.wind_kph}<p className='text-lg pt-2.5'>km/h</p></h1></div>
          </div>
          <div className='text-xl mt-7 mb-4 ps-1 font-medium'>Daily forecast</div>

          <div className='flex justify-evenly flex-wrap gap-5 tabs-1'>
            {weather?.forecast?.forecastday?.map((day, index) => {
              const dayName = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short"
              });
              return (
                <div key={index} className='p-5 text-center flex-1 rounded-xl bg-amber-100/20'>
                  <p className='mb-2 font-medium'>{dayName}</p>
                  <img src={day.day.condition.icon} alt="" className="mx-auto w-10" />
                  <div className='flex justify-between text-[12px] mt-2'>
                    <p>{day.day.mintemp_c}°</p>
                    <p>{day.day.maxtemp_c}°</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div className='right-container  bg-amber-100/20 rounded-2xl w-lg flex flex-col gap-4 px-8 py-5 h-[628px]  overflow-auto scroll-hidden'>
          <div className='flex justify-between'><p className='font-medium text-2xl pb-2 fnt-3'>Hourly Forecast ~</p></div>
          {weather?.forecast?.forecastday?.[0]?.hour?.map((hour, index) => {
            const time = new Date(hour.time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div key={index} className='bg-amber-100/10 border border-zinc-500 p-4 rounded-xl flex items-center'>
                <img src={hour.condition.icon} alt="" className='w-5 flex-1 pr-3' />
                <p className='flex-3 text-sm'>{time}</p>
                <p className='flex-4 text-end text-sm opacity-70'>{hour.temp_c}°C</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default App
