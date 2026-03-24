# Geolocation Feature Implementation Plan

## Overview
Add current location weather using browser Geolocation API + server support for lat/lon params.

## Steps (Approved Plan)

### 1. ✅ Update server/routes/weather.js
- Add lat/lon param support with reverse geocoding for city name.

### 2. ✅ Update client/src/components/Search.js
- Add "📍 Current Location" button.

### 3. ✅ Update client/src/App.js
- Refactor fetchWeather for city OR {lat,lon}.
- Add geolocation handler passed to Search.

### 4. 🔄 Update client/src/components/WeatherCard.js (optional)
- Display lat/lon if present.

### 5. 🔄 Test locally
- Start server: `cd server &amp;&amp; npm run dev`
- Start client: `cd client &amp;&amp; npm start`
- Test: City search (unchanged), Current Location (allow → weather shows).

### 6. 🔄 Deploy reminder
- Client auto-deploys to Netlify.
- Server to Render.

**Progress: Starting step 1...**

