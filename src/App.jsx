import axios from "axios";
import { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import { GiLifeTap } from "react-icons/gi";
import { TbTemperatureSun } from "react-icons/tb";

function App() {

  const [weather, setWether] = useState(null)
  const [city, setCity] = useState("noida");

  const api = (cityName) => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=b3475b1d3c964769aa850722260704&q=${cityName}&days=1&aqi=no&alerts=no`).then((d) => {
      console.log(d.data);
      setWether(d.data);
    })
  };
  useEffect(() => {
  api(city);
}, [city]);

  return (
    <div className='bg'>
      <div className="font-bold text-amber-900 p-3">Weather app</div>
      <div className='nav'>
        <input type="text" placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={() => api(city)}>Search</button>
      </div>
      <div className="items">
        <div className="left"></div>
        <div className="right text-white ">
          <p className='text-2xl font-bold'>{weather?.location?.name}, {weather?.location?.country}</p>
          <p className='text-xl '>sunny</p>
          <p className='text-7xl font-bold'>{weather?.current.temp_c}°C</p>
          <p className='text-xl font-medium'>feel like {weather?.current.feelslike_c}°C</p>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className=" bg-violet-800/40 rounded-lg w-4/6 flex justify-around p-4 text-white">
          {/* <p className='text-xl flex gap-3'><TbTemperatureSun className=" mt-1.5" />29°C High/18°C</p> */}
          <p className='text-xl flex gap-3'>
            <TbTemperatureSun className="mt-1.5" />
            {weather?.forecast?.forecastday?.[0]?.day?.maxtemp_c}°C /
            {weather?.forecast?.forecastday?.[0]?.day?.mintemp_c}°C
          </p>
          <p className='text-2xl'>|</p>
          <p className='text-xl flex gap-3'><FaWind className=" mt-1.5" />{weather?.current.wind_kph} km/h</p>
          <p className='text-2xl'>|</p>
          <p className='text-xl flex gap-3'><GiLifeTap className=" mt-1.5" />{weather?.current.humidity}% Humidity</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className=" bg-violet-800/40 rounded-t-lg w-4/6 p-2 text-white font-bold">
          Today's Forcast
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" bg-white rounded-b-lg w-4/6 p-2 flex ">
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >Now</p>
            <p>{weather?.current.temp_c}°C</p>
          </div>
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >8:00 am</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[8].temp_c}°C</p>
          </div>
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >11:00 am</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[11].temp_c}°C</p>
          </div>
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >1:00 pm</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[13].temp_c}°C</p>
          </div>
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >4:00 pm</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[16].temp_c}°C</p>
          </div>
          <div className="border-r text-center p-5 w-40 ">
            <p className="text-xl font-medium" >7:00 pm</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[19].temp_c}°C</p>
          </div>
          <div className=" p-5 text-center w-40">
            <p className="text-xl font-medium" >10:00pm</p>
            <p>{weather?.forecast?.forecastday?.[0]?.hour[22].temp_c}°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App