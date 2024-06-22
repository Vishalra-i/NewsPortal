import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../Resources/images/search.png';
import rainIcon from '../Resources/images/rain.png';
import cloudsIcon from '../Resources/images/clouds.png';
import drizzleIcon from '../Resources/images/drizzle.png';
import snowIcon from '../Resources/images/snow.png';
import clearIcon from '../Resources/images/clear.png';
import humidityIcon from '../Resources/images/humidity.png';
import windIcon from '../Resources/images/wind.png';

function WeatherReport() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      }, (err) => {
        console.error(err);
        setError('Geolocation is not supported by this browser or permission denied.');
      });
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
      const Apikey = import.meta.env.VITE_WEATHER_API;
      const response = await axios.get(`${apiurl}&appid=${Apikey}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Invalid City name');
      setWeather(null);
      console.log(err);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
      const Apikey = import.meta.env.VITE_WEATHER_API;
      const response = await axios.get(`${apiurl}&appid=${Apikey}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data for the current location');
      setWeather(null);
      console.log(err);
    }
  };

  const handleSearch = () => {
    if (city.toLowerCase() === 'jashpur') {
      fetchWeather('jashpurnagar');
    } else {
      fetchWeather(city);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clouds':
        return cloudsIcon;
      case 'Haze':
        return drizzleIcon;
      case 'Rain':
        return rainIcon;
      case 'Snow':
        return snowIcon;
      case 'Clear':
        return clearIcon;
      default:
        return clearIcon;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      {/* Search box */}
      <div className="flex items-center mb-5">
        <input
          type="text"
          placeholder="Enter City Name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow p-2 border rounded-l-md outline-none"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 rounded-r-md">
          <img src={searchIcon} alt="search button" role="button" className="w-5 h-5" />
        </button>
      </div>
      {error && <h1 className="text-red-500 text-center mb-4">{error}</h1>}
      {weather && (
        <div className="text-center">
          <img src={getWeatherIcon(weather.weather[0].main)} className="mx-auto mb-4 w-24 h-24" alt="weather icon" />
          <h1 className="text-4xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h1>
          <h2 className="text-2xl mb-4">{weather.name}</h2>
          <div className="flex justify-around text-left">
            <div className="flex items-center space-x-2">
              <img src={humidityIcon} className="w-6 h-6" alt="humidity icon" />
              <div>
                <h3 className="text-lg">{weather.main.humidity}%</h3>
                <p className="text-sm text-gray-600">Humidity</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img src={windIcon} className="w-6 h-6" alt="wind icon" />
              <div>
                <h3 className="text-lg">{weather.wind.speed} km/h</h3>
                <p className="text-sm text-gray-600">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherReport;
