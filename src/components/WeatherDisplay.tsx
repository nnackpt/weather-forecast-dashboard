import { useState } from "react";
import { DailyForecast, WeatherResponse } from "@/lib/types";
import WeatherCard from "./WeatherCard";
import { getWeatherType } from "@/lib/weatherService";

interface WeatherDisplayProps {
    weatherData: WeatherResponse
    dailyForecasts: DailyForecast[]
}

export default function WeatherDisplay({ weatherData, dailyForecasts }: WeatherDisplayProps) {
    const [isCelsius, setIsCelsius] = useState(true)

    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius)
    }

    const currentWeather = dailyForecasts.length > 0 ? dailyForecasts[0].weather.main : 'Default'
    const weatherType = getWeatherType(currentWeather)

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {weatherData.city.name}, {weatherData.city.country}
                </h2>

                <button
                    onClick={toggleTemperatureUnit}
                    className="mt-2 px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm hover:bg-white shadow-sm flex items-center"
                >
                    <span className={isCelsius ? 'font-bold' : ''}>°C</span>
                    <span className="mx-1">/</span>
                    <span className={!isCelsius ? 'font-bold' : ''}>°F</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {dailyForecasts.map((forecast) => (
                    <WeatherCard 
                        key={forecast.timestamp}
                        forecast={forecast}
                        isCelsius={isCelsius}
                    />
                ))}
            </div>
        </div>
    )
}