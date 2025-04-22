import { DailyForecast } from "@/lib/types";
import { convertToFahrenheit, formatDate } from "@/lib/weatherService";

interface WeatherCardProps {
    forecast: DailyForecast
    isCelsius: boolean
}

export default function WeatherCard({ forecast, isCelsius }: WeatherCardProps) {
    const temperature = isCelsius
        ? Math.round(forecast.temp)
        : Math.round(convertToFahrenheit(forecast.temp))

    const unitsSymbol = isCelsius ? '°C' : '°F'

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 flex flex-col items-center transition-all hover:transform hover:scale-105">
            <h3 className="font-medium text-gray-700">
                {formatDate(forecast.timestamp)}
            </h3>

            <div className="my-2">
                <img 
                    src={`http://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`} 
                    alt={forecast.weather.description}
                    className="w-16 h-16" 
                />
            </div>

            <div className="text-2xl font-bold text-gray-800">
                {temperature}{unitsSymbol}
            </div>

            <div className="text-sm text-gray-600 capitalize">
                {forecast.weather.description}
            </div>

            <div className="mt-2 text-sm text-gray-500">
                Humidity: {forecast.humidity}%
            </div>
        </div>
    )
}