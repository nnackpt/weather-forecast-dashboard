import { WeatherType } from "@/lib/types";

interface WeatherBackgroundProps {
    weatherType: WeatherType;
    children: React.ReactNode;
}

export default function WeatherBackground({ weatherType, children }: WeatherBackgroundProps) {
    const getBackgroundClasses = (): string => {
        switch (weatherType) {
            case 'Clear':
                return 'bg-gradient-to-br from-blue-400 to-blue-200'
            case 'Clouds':
                return 'bg-gradient-to-br from-gray-300 to-blue-200'
            case 'Rain':
            case 'Drizzle':
                return 'bg-gradient-to-br from-gray-500 to-gray-400'
            case 'Snow':
                return 'bg-gradient-to-br from-blue-50 to-blue-100'
            case 'Thunderstorm':
                return 'bg-gradient-to-br from-gray-700 to-gray-500'
            case 'Atmosphere':
                return 'bg-gradient-to-br from-gray-400 to-gray-300'
            default:
                return 'bg-gradient-to-br from-blue-400 to-blue-200'
        }
    }

    return (
        <div className={`min-h-screen w-full transition-all duration-500 ${getBackgroundClasses()}`}>
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    )
}