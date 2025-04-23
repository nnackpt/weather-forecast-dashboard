import { DailyForecast } from "@/lib/types";

interface ClothingRecommendationProps {
    forecast: DailyForecast
    isCelsius: boolean
}

export default function ClothingRecommendation({ forecast, isCelsius }: ClothingRecommendationProps) {
    const temperature = isCelsius ? forecast.temp : (forecast.temp - 32) * 5/9
    const weatherMain = forecast.weather.main.toLowerCase()

    const getClothingRecommendation = (): { icon: string; text: string; description: string } => {
        // very cold weather (below 0°C/32°F)
        if (temperature < 0) {
            return {
                icon: '🧥',
                text: 'Heavy Winter Clothing',
                description: 'Wear a heavy coat, scarf, gloves, hat, and insulated boots. Layer up with thermal underwear.'
            }
        }

        // cold weather (0-10°C/32-50°F)
        if (temperature < 10) {
            if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
                return {
                    icon: '☔',
                    text: 'Cold & Rainy Outfit',
                    description: 'Wear a waterproof coat, sweater, long pants, and waterproof boots. Don\'t forget an umbrella!'
                }
            }
            return {
                icon: '🧣',
                text: 'Winter Outfit',
                description: 'Wear a winter coat, sweater, long pants, and warm shoes. Consider a scarf and gloves.'
            }
        }

        // cool weather (10-18°C/50-65°F)
        if (temperature < 18) {
            if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
                return {
                    icon: '🌂',
                    text: 'Cools & Rainy Outfit',
                    description: 'Wear a light jacket or coat, long sleeves, and water-resistant shoes. Bring an umbrella.'
                }
            }
            return {
                icon: '🧥',
                text: 'Light Layers',
                description: 'Wear a light jacket or sweater with long pants. A long-sleeve shirt is recommended.'
            }
        }

        // mild weather (18-25°C/65-77°F)
        if (temperature < 25) {
            if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
                return {
                    icon: '🌦️',
                    text: 'Mild & Rainy Outfit',
                    description: 'Wear a light water-resistant jacket with casual cluthes. Bring an umbrella just in case.'
                }
            }
            return {
                icon: '👕',
                text: 'Comfortable Clothing',
                description: 'Wear a t-shirt or light long sleeve with pants or a casual dress/skirt. Perfect for a light jacket if needed.'
            }
        }

        // warm weather (25-30°C/77-86°F)
        if (temperature < 30) {
            if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
                return {
                    icon: '🌦️',
                    text: 'Warm & Rainy Outfit',
                    description: 'Wear light, breathable clothes with a light rain jacket. Quick-drying fabrics are ideal.'
                }
            }
            return {
                icon: '😎',
                text: 'Summer Clothing',
                description: 'Wear short sleeves, shorts or light pants/skirts. Don\'t forget sunscreen and sunglasses if it\'s sunny!'
            }
        }

        // hot weather (above 30°C/86°F)
        if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
            return {
                icon: '☂️',
                text: 'Hot & Rainy Outfit',
                description: 'Wear very light, breathable clothing. Consider a small umbrella or a light rain poncho.'
            }
        }
        return {
            icon: '🩳',
            text: 'Very Light Clothing',
            description: 'Wear the lightest, most breathable clothing possible. Protect yourself from the sun with a hat, sunglasses, and sunscreen.'
        }
    }

    const recommendation = getClothingRecommendation()

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">What to Wear Today?</h3>

            <div className="flex items-center space-x-4">
                <div className="text-4xl">{recommendation.icon}</div>
                <div>
                    <p className="text-lg font-medium text-gray-800">{recommendation.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                </div>
            </div>
        </div>
    )
}