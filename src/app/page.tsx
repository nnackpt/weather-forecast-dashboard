'use client';

import ClothingRecommendation from "@/components/ClothingRecommendation";
import DynamicBackground from "@/components/DynamicBackground";
import ErrorMessage from "@/components/ErrorMessage";
import SearchBar from "@/components/SearchBar";
import TemperatureChart from "@/components/TemperatureChart";
import WeatherMetrics from "@/components/WeatherMetrics";
import { DailyForecast, WeatherResponse, WeatherType } from "@/lib/types";
import { getWeatherForecast, getWeatherType } from "@/lib/weatherService";
import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weatherType, setWeatherType] = useState<WeatherType>('Default')
  const [isCelsius, setIsCelsius] = useState(true)

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius)
  }

  const handleSearch = async (city: string) => {
    setLoading(true)
    setError(null)

    const result = await getWeatherForecast(city)

    if (result.error) {
      setError(result.error)
      setWeatherData(null)
      setDailyForecasts([])
      setWeatherType('Default')
    } else if (result.data && result.dailyForecasts) {
      setWeatherData(result.data)
      setDailyForecasts(result.dailyForecasts)
      const currentWeather = result.dailyForecasts[0].weather.main
      setWeatherType(getWeatherType(currentWeather))
    }

    setLoading(false)
  }

  return (
    <DynamicBackground weatherType={weatherType}>
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-md">
          5-Day Weather Forecast
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && <ErrorMessage message={error} />}

        {weatherData && dailyForecasts.length > 0 && (
          <div className="w-full max-w-5xl mx-auto mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {weatherData.city.name}, {weatherData.city.country}
              </h2>

              <button
                onClick={toggleTemperatureUnit}
                className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm hover:bg-white shadow-sm flex items-center"
              >
                <span className={isCelsius ? 'font-bold' : ''}>°C</span>
                <span className="mx-1">/</span>
                <span className={!isCelsius ? 'font-bold' : ''}>°F</span>
              </button>
            </div>

            <ClothingRecommendation forecast={dailyForecasts[0]} isCelsius={isCelsius} />

            <TemperatureChart weatherData={weatherData} isCelsius={isCelsius} />

            <WeatherMetrics weatherData={weatherData} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
              {dailyForecasts.map((forecast) => (
                <div key={forecast.timestamp} className="transition-all hover:transform hover:scale-105">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 flex flex-col items-center">
                    <h3 className="font-medium text-gray-700">
                      {new Date(forecast.timestamp * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </h3>

                    <div className="my-2">
                      <img 
                        src={`http://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`} 
                        alt={forecast.weather.description}
                        className="w-16 h-16" 
                      />
                    </div>

                    <div className="text-2xl font-bold text-gray-800">
                      {isCelsius ? Math.round(forecast.temp) : Math.round((forecast.temp * 9/5) + 32)}
                      {isCelsius ? '°C' : '°F'}
                    </div>

                    <div className="text-sm text-gray-600 capitalize">
                      {forecast.weather.description}
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      Humidity: {forecast.humidity}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!weatherData && !error && !loading && (
          <div className="mt-12 text-center text-white">
            <p className="text-xl">Search for a city to see the weather forecast</p>
            <p className="mt-2 text-sm">Try places like Bangkok, London, New York, Tokyo</p>
          </div>
        )}
      </div>
    </DynamicBackground>
  )
}