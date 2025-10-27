import React, { useState } from 'react';

export default function Search({ onSearch }) {
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

    return (
        <div className="mb-6">
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
        </div>
    );
}
