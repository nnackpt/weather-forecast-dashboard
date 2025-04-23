export interface WeatherResponse {
    city: {
        name: string,
        country: string;
        coord?: {
            lat: number;
            lon: number;
        };
    };
    list: WeatherForecastItem[];
}

export interface WeatherForecastItem {
    dt: number;
    main: {
        temp: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind?: {
        speed: number;
        deg: number;
    };
    clouds?: {
        all:number;
    };
    dt_txt: string;
}

export interface DailyForecast {
    date: string;
    timestamp: number;
    temp: number;
    humidity: number;
    weather: {
        main: string;
        description: string;
        icon: string;
    };
}

export type WeatherType = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Drizzle' | 'Atmosphere' | 'Default';

export interface SearchResult {
    data?: WeatherResponse;
    dailyForecasts?: DailyForecast[];
    error?: string;
}

export interface TemperatureUnit {
    unit: 'celsius' | 'fahrenheit';
}