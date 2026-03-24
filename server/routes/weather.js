const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/weather?city=CityName or ?lat=52.52&lon=13.405
router.get('/weather', async (req, res) => {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ error: 'Either city or lat+lon parameters are required' });
    }

    try {
        let useLat = parseFloat(lat);
        let useLon = parseFloat(lon);
        let displayCity;

        if (lat && lon) {
            // Direct lat/lon: reverse geocode for city name
            const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
            const reverseResponse = await axios.get(reverseUrl, {
                headers: {
                    'User-Agent': 'WeatherNow-App/1.0'
                }
            });
            const reverseData = reverseResponse.data;
            displayCity = reverseData.display_name || `Lat ${lat}, Lon ${lon}`;
        } else {
            // City name: forward geocode
            const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;
            const geocodeResponse = await axios.get(geocodeUrl, {
                headers: {
                    'User-Agent': 'WeatherNow-App/1.0'
                }
            });
            const geocodeData = geocodeResponse.data;

            if (!geocodeData || geocodeData.length === 0) {
                return res.status(404).json({ error: 'City not found' });
            }

            useLat = parseFloat(geocodeData[0].lat);
            useLon = parseFloat(geocodeData[0].lon);
            displayCity = city;
        }

        // Fetch weather from Open-Meteo API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${useLat}&longitude=${useLon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m`;
        const weatherResponse = await axios.get(weatherUrl, {
            headers: {
                'User-Agent': 'WeatherNow-App/1.0'
            }
        });
        const weatherData = weatherResponse.data;

        // Format response
        const currentWeather = weatherData.current_weather;
        const response = {
            city: displayCity,
            latitude: useLat,
            longitude: useLon,
            temperature: currentWeather.temperature,
            windspeed: currentWeather.windspeed,
            weathercode: currentWeather.weathercode,
            time: currentWeather.time,
            humidity: weatherData.hourly?.relative_humidity_2m?.[0] || null
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
