import React, { useState } from 'react';
import { Cloud } from 'lucide-react';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard'

function App() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
            const response = await fetch(`${apiBaseUrl}/api/weather?city=${city}`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError('Unable to find weather data. Please check the city name and try again.');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-md">
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white border-opacity-30">
                    <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
                        Weather Now
                    </h1>
                    
                    <Search onSearch={fetchWeather} />

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
                            <p className="text-white text-lg">Fetching weather data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500 bg-opacity-90 text-white p-4 rounded-2xl text-center shadow-lg">
                            <p>{error}</p>
                        </div>
                    )}

                    {weather && !loading && <WeatherCard weather={weather} />}

                    {!weather && !loading && !error && (
                        <div className="text-center py-12">
                            <Cloud className="w-24 h-24 text-white opacity-50 mx-auto mb-4" />
                            <p className="text-white text-lg">Search for a city to see weather information</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}

export default App;