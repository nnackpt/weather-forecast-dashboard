import { useState, FormEvent, ChangeEvent } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [city, setCity] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (city.trim() !== '') {
            onSearch(city.trim())
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input 
                    type="text"
                    value={city}
                    onChange={handleChange}
                    placeholder="Search for city names such as Bangkok, Tokyo..." 
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                />
                <button
                    type="submit"
                    disabled={isLoading || city.trim() === ''}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 transition-colors duration-200 shadow-sm"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Searching for...
                        </div>
                    ) : (
                        'Search'
                    )}
                </button>
            </form>
        </div>
    )
}