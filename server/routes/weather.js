const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/weather?city=CityName
router.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        // Step 1: Geocode city to get latitude and longitude using Nominatim
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;
        const geocodeResponse = await axios.get(geocodeUrl);
        const geocodeData = geocodeResponse.data;

        if (!geocodeData || geocodeData.length === 0) {
            return res.status(404).json({ error: 'City not found' });
        }

        const { lat, lon } = geocodeData[0];

        // Step 2: Fetch weather data from Open-Meteo API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m`;
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;

        // Step 3: Format and return the response
        const currentWeather = weatherData.current_weather;
        const response = {
            city: city,
            latitude: lat,
            longitude: lon,
            temperature: currentWeather.temperature,
            windspeed: currentWeather.windspeed,
            weathercode: currentWeather.weathercode,
            time: currentWeather.time,
            // Additional data from hourly if available
            humidity: weatherData.hourly?.relative_humidity_2m?.[0] || null
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
