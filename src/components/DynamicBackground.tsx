import { WeatherType } from "@/lib/types";
import React, { useEffect, useState } from "react";

interface DynamicBackgroundProps {
    weatherType: WeatherType
    children: React.ReactNode
}

export default function DynamicBackground({ weatherType, children }: DynamicBackgroundProps) {
    const [backgroundImage, setBackgroundImage] = useState<string>('')

    useEffect(() => {
        const getUnsplashQuery = (): string => {
            switch (weatherType) {
                case 'Clear':
                    return 'sunny sky'
                case 'Clouds':
                    return 'cloudy sky'
                case 'Rain':
                    return 'rainy weather'
                case 'Drizzle':
                    return 'light rain'
                case 'Snow':
                    return 'snow landscape'
                case 'Thunderstorm':
                    return 'thunderstorm'
                case 'Atmosphere':
                    return 'foggy landscape'
                default:
                    return 'nature landscape' 
            }
        }

        const query = getUnsplashQuery()
        const unsplashUrl = `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`
        setBackgroundImage(unsplashUrl)
    }, [weatherType])

    const getOverlayGradient = (): string => {
        switch (weatherType) {
            case 'Clear':
                return 'bg-gradient-to-b from-blue-400/60 to-blue-600/60'
            case 'Clouds':
                return 'bg-gradient-to-b from-gray-400/60 to-gray-600/60'
            case 'Rain':
            case 'Drizzle':
                return 'bg-gradient-to-b from-gray-600/70 to-gray-800/70'
            case 'Snow':
                return 'bg-gradient-to-b from-blue-100/60 to-blue-300/60'
            case 'Thunderstorm':
                return 'bg-gradient-to-b from-gray-700/70 to-gray-900/70'
            case 'Atmosphere':
                return 'bg-gradient-to-b from-gray-500/70 to-gray-700/70'
            default:
                return 'bg-gradient-to-b from-blue-500/60 to-blue-700/60'
        }
    }

    const getFallbackGradient = (): string => {
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
                return 'bg-gradient-to-br from-blue-300 to-blue-100'
        }
    }

    return (
        <div className="relative min-h-screen w-full">
          {backgroundImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          ) : (
            <div className={`absolute inset-0 ${getFallbackGradient()} z-0`} />
          )}
          
          <div className={`absolute inset-0 ${getOverlayGradient()} z-10`} />
          
          <div className="relative z-20 min-h-screen">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </div>
        </div>
      );
    }