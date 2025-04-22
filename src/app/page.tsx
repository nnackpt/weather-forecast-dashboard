'use client';

import ErrorMessage from "@/components/ErrorMessage";
import SearchBar from "@/components/SearchBar";
import WeatherBackground from "@/components/WeatherBackground";
import WeatherDisplay from "@/components/WeatherDisplay";
import { DailyForecast, WeatherResponse, WeatherType } from "@/lib/types";
import { getWeatherForecast, getWeatherType } from "@/lib/weatherService";
import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weatherType, setWeatherType] = useState<WeatherType>('Default')

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
    <WeatherBackground weatherType={weatherType}>
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
          Weather Forecast 5 Days
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && <ErrorMessage message={error} />}

        {weatherData && dailyForecasts.length > 0 && (
          <WeatherDisplay 
            weatherData={weatherData}
            dailyForecasts={dailyForecasts}
          />
        )}

        {!weatherData && !error && !loading && (
          <div className="mt-12 text-center text-white">
            <p className="text-xl">Search for a city name to get started.</p>
            <p className="mt-2 text-sm">Such as Bangkok, London, New York, Tokyo</p>
          </div>
        )}
      </div>
    </WeatherBackground>
  )
}