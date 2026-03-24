import React, { useState } from 'react';

export default function Search({ onSearch, onCurrentLocation }) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCurrentLocationClick = () => {
        if (onCurrentLocation) {
            onCurrentLocation();
        }
    };

    return (
        <div className="mb-6 space-y-3">
            <div className="relative">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for a city..."
                    className="w-full px-6 py-4 pr-14 bg-white bg-opacity-90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-gray-800 placeholder-gray-500 shadow-lg transition-all"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <button
                onClick={handleCurrentLocationClick}
                className="w-full py-4 px-6 bg-green-500 text-white rounded-2xl hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Use Current Location</span>
            </button>
        </div>
    );
}
