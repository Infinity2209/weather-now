const axios = require('axios');

exports.handler = async (event, context) => {
    const { city } = event.queryStringParameters;

    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'City parameter is required' }),
        };
    }

    try {
        // Step 1: Geocode city to get latitude and longitude using Nominatim
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;
        const geocodeResponse = await axios.get(geocodeUrl);
        const geocodeData = geocodeResponse.data;

        if (!geocodeData || geocodeData.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'City not found' }),
            };
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

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather data' }),
        };
    }
};
