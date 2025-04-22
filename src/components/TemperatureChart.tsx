import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { WeatherResponse } from "@/lib/types";
import { convertToFahrenheit } from "@/lib/weatherService";

interface TemperatureChartProps {
    weatherData: WeatherResponse
    isCelsius: boolean
}

export default function TemperatureChart({ weatherData, isCelsius }: TemperatureChartProps) {
    const [viewMode, setViewMode] = useState<'hourly' | 'daily'>('hourly')

    const processChartData = () => {
        if (viewMode === 'hourly') {
            return weatherData.list.slice(0, 8).map(item => {
                const temp = isCelsius ? item.main.temp : convertToFahrenheit(item.main.temp)
                const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                const date = new Date(item.dt * 1000).toLocaleDateString([], {month: 'short', day: 'numeric'})

                return {
                    time: `${time} (${date})`,
                    temperature: Math.round(temp),
                    description: item.weather[0].description,
                    humidity: item.main.humidity,
                }
            })
        } else {
            const dailyData: { [key: string]: any } = {};

            weatherData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' })
                const hour = new Date(item.dt * 1000).getHours()

                if (!dailyData[date] || Math.abs(hour - 12) < Math.abs(dailyData[date].hour - 12)) {
                    const temp = isCelsius ? item.main.temp : convertToFahrenheit(item.main.temp)

                    dailyData[date] = {
                        time: date,
                        temperature: Math.round(temp),
                        hour: hour,
                        description: item.weather[0].description,
                        humidity: item.main.humidity,
                    }
                }
            })

            return Object.values(dailyData)
        }
    }

    const chartData = processChartData()
    const unit = isCelsius ? '°C' : '°F'

    return (
        <div className="bg-white/90 rounded-lg shadow-md p-4 my-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Temperature Chart</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewMode('hourly')}
                        className={`px-3 py-1 text-sm rounded-full ${
                            viewMode === 'hourly'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Hourly
                    </button>
                    <button
                        onClick={() => setViewMode('daily')}
                        className={`px-3 py-1 text-sm rounded-full ${
                            viewMode === 'daily'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'  
                        }`}
                    >
                        Daily
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis label={{ value: `Temperature (${unit})`, angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        formatter={(value: number) => [`${value} ${unit}`, 'Temperature']}
                        labelFormatter={(label) => `Time: ${label}`}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <Legend />
                    <Line 
                        type="monotone"
                        dataKey="temperature"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name={`Temperature (${unit})`}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}