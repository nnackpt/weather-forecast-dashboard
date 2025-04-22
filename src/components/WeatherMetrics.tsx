import { useState, useEffect } from "react";
import { WeatherResponse } from "@/lib/types";

interface WeatherMetricsProps {
    weatherData: WeatherResponse
}

interface UVIndexData {
    value: number
    risk_level: string
}

export default function WeatherMetrics({ weatherData }: WeatherMetricsProps) {
    const [uvIndex, setUvIndex] = useState<UVIndexData | null>(null)
    const [loading, setLoading] = useState(false)

    const currentWeather = weatherData.list[0]
    const windSpeed = currentWeather.wind?.speed || 0
    const pressure = currentWeather.main?.pressure || 0

    useEffect(() => {
        const fetchUVIndex = async () => {
            try {
                setLoading(true)
                const lat = weatherData.city.coord?.lat
                const lon = weatherData.city.coord?.lon

                if (!lat || !lon) return

                const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                )

                if (!response.ok) throw new Error('Failed to fetch UV data')

                const data = await response.json()

                let riskLevel = 'Low'
                if (data.value >= 3 && data.value < 6) riskLevel = 'Moderate'
                else if (data.value >= 6 && data.value < 8) riskLevel = 'High'
                else if (data.value >= 8 && data.value < 11) riskLevel = 'Very High'
                else if (data.value >= 11) riskLevel = 'Extreme'

                setUvIndex({ value: data.value, risk_level: riskLevel })
            } catch (error) {
                console.error('Error fetching UV index:', error)
            } finally {
                setLoading(false)
            }
        }

        if (weatherData.city.coord) {
            fetchUVIndex()
        }
    }, [weatherData])

    const getUVIndexColor = (value: number): string => {
        if (value < 3) return 'text-green-500'
        if (value < 6) return 'text-yellow-500'
        if (value < 8) return 'text-orange-500'
        if (value < 11) return 'text-red-500'
        return 'text-purple-500'
    }

    return (
        <div className="bg-white/90 rounded-lg shadow-md p-4 my-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Weather Metrics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Wind Speed</p>
                        <p className="font-semibold text-gray-700">{windSpeed} m/s</p>
                    </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pressure</p>
                        <p className="font-semibold text-gray-700">{pressure} hPa</p>
                    </div>
                </div>

                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-full mr-3">
                        <svg className="w-6 h-6 text-yellow-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">UV Index</p>
                        {loading ? (
                            <p className="text-sm text-gray-400">Loading...</p>
                        ) : uvIndex ? (
                            <div>
                                <p className={`font-semibold ${getUVIndexColor(uvIndex.value)}`}>
                                    {uvIndex.value.toFixed(1)} ({uvIndex.risk_level})
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">Not available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}