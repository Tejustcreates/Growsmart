
import React, { useState, useCallback } from 'react';
import { Section } from '../types';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: {
    day: string;
    temp: number;
    icon: string;
  }[];
}

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = useCallback(() => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError('');
    setWeatherData(null);

    // Simulate API call
    setTimeout(() => {
      // Mock data based on city input to show some dynamic feel
      const temp = 25 + (city.length % 15); 
      const mockData: WeatherData = {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        temperature: temp,
        description: 'Partly Cloudy',
        humidity: 60 + (city.length % 10),
        windSpeed: 15 + (city.length % 5),
        icon: 'fas fa-cloud-sun',
        forecast: [
          { day: 'Mon', temp: temp + 2, icon: 'fas fa-sun' },
          { day: 'Tue', temp: temp - 1, icon: 'fas fa-cloud-showers-heavy' },
          { day: 'Wed', temp: temp + 1, icon: 'fas fa-cloud-sun' },
          { day: 'Thu', temp: temp + 3, icon: 'fas fa-sun' },
          { day: 'Fri', temp: temp, icon: 'fas fa-cloud' },
        ],
      };
      setWeatherData(mockData);
      setLoading(false);
    }, 1500);
  }, [city]);

  return (
    <section id={Section.WEATHER} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Weather <span className="text-green-600">Forecast</span>
          </h2>
          <p className="text-gray-600 mt-4">Get real-time weather updates to plan your farming activities.</p>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={fetchWeatherData}
              disabled={loading}
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

        {weatherData && (
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{weatherData.city}</h3>
                <p className="text-lg text-gray-600">{weatherData.description}</p>
              </div>
              <div className="flex items-center my-4 md:my-0">
                <i className={`${weatherData.icon} text-6xl text-yellow-400 mr-4`}></i>
                <p className="text-7xl font-bold text-gray-800">{weatherData.temperature}°C</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-gray-700">Humidity: {weatherData.humidity}%</p>
                <p className="text-gray-700">Wind Speed: {weatherData.windSpeed} km/h</p>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex justify-around text-center">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="font-semibold text-gray-700">{day.day}</p>
                  <i className={`${day.icon} text-3xl text-gray-500 my-2`}></i>
                  <p className="font-bold text-gray-800">{day.temp}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
