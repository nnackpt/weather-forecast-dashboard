import { WeatherResponse, DailyForecast, SearchResult, WeatherType } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherForecast(city: string): Promise<SearchResult> {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                return { error: 'City not found. Please try again.'};
            }
            throw new Error('Failed to fetch weather forecasts')
        }

        const data: WeatherResponse = await response.json();
        const dailyForecasts = processForecastData(data);

        return { data, dailyForecasts };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { error: 'An error occurred while fetching weather data.' };
    }
}

function processForecastData(data: WeatherResponse): DailyForecast[] {
    const forecastsByDay: { [key: string]: WeatherForecast[] } = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!forecastsByDay[date]) {
            forecastsByDay[date] = [];
        }
        forecastsByDay[date].push(item);
    });

    const dailyForecasts: DailyForecast[] = [];

    Object.keys(forecastsByDay).forEach(date => {
        const forecastsForDay = forecastsByDay[date];

        let noonForecast = forecastsForDay.find(item => item.dt_txt.includes('12:00'));
        if (!noonForecast) {
            noonForecast = forecastsForDay[0];
        }

        dailyForecasts.push({
            date: date,
            timestamp: noonForecast.dt,
            temp: noonForecast.main.temp,
            humidity: noonForecast.main.humidity,
            weather: {
                main: noonForecast.weather[0].main,
                description: noonForecast.weather[0].description,
                icon: noonForecast.weather[0].icon
            }
        });
    });

    return dailyForecasts.slice(0, 5);
}

export function convertToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
}

export function getWeatherType(weather: string): WeatherType {
    if (weather.includes('Clear')) return 'Clear';
    if (weather.includes('Cloud')) return 'Clouds';
    if (weather.includes('Rain')) return 'Rain';
    if (weather.includes('Snow')) return 'Snow';
    if (weather.includes('Thunderstorm')) return 'Thunderstorm';
    if (weather.includes('Drizzle')) return 'Drizzle';
    if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash'].some(type => weather.includes(type))) {
        return 'Atmosphere';
    }
    return 'Default';
}

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}