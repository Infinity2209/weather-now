import React from 'react';

function WeatherCard({ weather }) {
    const { city, temperature, weathercode, humidity, windspeed } = weather;

    const getWeatherDescription = (code) => {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Drizzle: Light',
            53: 'Drizzle: Moderate',
            55: 'Drizzle: Dense',
            56: 'Freezing Drizzle: Light',
            57: 'Freezing Drizzle: Dense',
            61: 'Rain: Slight',
            63: 'Rain: Moderate',
            65: 'Rain: Heavy',
            66: 'Freezing Rain: Light',
            67: 'Freezing Rain: Heavy',
            71: 'Snow fall: Slight',
            73: 'Snow fall: Moderate',
            75: 'Snow fall: Heavy',
            77: 'Snow grains',
            80: 'Rain showers: Slight',
            81: 'Rain showers: Moderate',
            82: 'Rain showers: Violent',
            85: 'Snow showers slight',
            86: 'Snow showers heavy',
            95: 'Thunderstorm: Slight or moderate',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown';
    };

    const weather_description = getWeatherDescription(weathercode);

    const getWeatherIcon = (description) => {
        const desc = description.toLowerCase();

        if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19v2m5-2v2m5-2v2" />
                </svg>
            );
        }
        if (desc.includes('snow')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    <circle cx="8" cy="20" r="1" fill="currentColor" />
                    <circle cx="12" cy="21" r="1" fill="currentColor" />
                    <circle cx="16" cy="20" r="1" fill="currentColor" />
                </svg>
            );
        }
        if (desc.includes('cloud') || desc.includes('overcast')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            );
        }
        if (desc.includes('clear') || desc.includes('sun')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            );
        }
        if (desc.includes('fog')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-2 2m0 0l2 2m-2-2h14" />
                </svg>
            );
        }
        if (desc.includes('thunderstorm')) {
            return (
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l-2 5h4l-2 5" />
                </svg>
            );
        }
        return (
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        );
    };

    return (
        <div className="animate-fade-in">
            <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">{city}</h2>
                    <p className="text-gray-600 capitalize">{weather_description}</p>
                </div>

                <div className="flex items-center justify-center mb-6">
                    <div className="text-blue-500">
                        {getWeatherIcon(weather_description)}
                    </div>
                    <div className="ml-4">
                        <div className="text-6xl font-bold text-gray-800">
                            {Math.round(temperature)}°
                        </div>
                        <div className="text-gray-600">Celsius</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center">
                        <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Humidity</p>
                            <p className="text-xl font-semibold text-gray-800">{humidity}%</p>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 flex items-center">
                        <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Wind Speed</p>
                            <p className="text-xl font-semibold text-gray-800">{windspeed} m/s</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
