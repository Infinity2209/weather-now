## 🌤️ Project: **Weather Now**

### 🎯 Goal

Provide real-time, accurate weather information for any city — simple, fast, and mobile-friendly.

---

## 🧱 High-Level Architecture

```
         ┌─────────────────────────────┐
         │         Frontend (UI)       │
         │  React + Tailwind (Netlify) │
         │─────────────────────────────│
         │  - Search city input        │
         │  - Display temperature,     │
         │    humidity, wind, etc.     │
         │  - Responsive design        │
         └──────────────┬──────────────┘
                        │ REST API (HTTPS)
                        ▼
         ┌─────────────────────────────┐
         │        Backend Server       │
         │   Node.js + Express (Render)│
         │─────────────────────────────│
         │  - Handles API requests     │
         │  - Calls Open-Meteo API     │
         │  - Error handling, logs     │
         └──────────────┬──────────────┘
                        │
                        ▼
         ┌─────────────────────────────┐
         │     Open-Meteo API          │
         │  (3rd-party weather API)    │
         └─────────────────────────────┘
```

---

## ⚙️ Detailed Component Breakdown

### 1. **Frontend (React on Netlify)**

**Purpose:**
Enable Jamie to search for a city and view weather details instantly.

**Features:**

* Input field to enter city name
* Display temperature, weather condition, humidity, wind speed
* Loader and error messages
* Responsive design for mobile/desktop
* Option to save favorite cities (optional enhancement)

**Tech Stack:**

* React
* Tailwind CSS
* Fetch API for backend communication
* Deployed on Netlify with environment variables for API URL

---

### 2. **Backend (Node.js + Express on Render)**

**Purpose:**
Serve as a middle layer between the frontend and Open-Meteo API.

**Responsibilities:**

* Receive city name from frontend (`/api/weather?city=London`)
* Use **OpenStreetMap's Nominatim** for geocoding to get latitude & longitude
* Fetch weather data from Open-Meteo API using coordinates
* Return formatted JSON to frontend
* Handle CORS for Netlify domain
* Deployed on Render with automatic scaling

**Example API flow:**

```
GET /api/weather?city=London

→ Backend:
   1. Convert “London” → (51.5074, -0.1278)
   2. Call Open-Meteo API:
      https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true
   3. Return:
      {
        city: "London",
        temperature: 14,
        windspeed: 10,
        weathercode: "Cloudy",
        time: "2025-10-27T12:00:00Z"
      }
```

---

### 3. **Database / Caching Layer (Optional)**

**Purpose:**
Optimize response speed and reduce API calls.

**Options:**

* **Redis** for caching recent queries (e.g., within 10 min)
* **MongoDB** for persistent storage of:

  * User favorites
  * Search history
  * App analytics

---

### 4. **Open-Meteo API Integration**

**Endpoints Used:**

* `/v1/forecast?latitude=<>&longitude=<>...`
* `/v1/geocoding?name=<city>` (if needed)

**Data Extracted:**

* Current temperature
* Wind speed/direction
* Weather code (mapped to icons)
* Humidity / precipitation

---

### 5. **Deployment & Infrastructure**

| Layer      | Tool/Service                   |
| ---------- | ------------------------------ |
| Frontend   | Vercel / Netlify               |
| Backend    | Render / Railway / AWS EC2     |
| DB / Cache | MongoDB Atlas / Redis Cloud    |
| Domain     | weather-now.app via Cloudflare |
| CI/CD      | GitHub Actions                 |

---

## 📦 Current Folder Structure

```
weather-now/
├── client/                  # React Frontend (Netlify)
│   ├── netlify/
│   │   └── functions/       # (Legacy - can be removed)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example         # API URL config
│   └── netlify.toml         # Netlify config
│
├── server/                  # Express Backend (Render)
│   ├── routes/
│   │   └── weather.js
│   ├── app.js
│   ├── package.json
│   └── render.yaml          # Render config
│
├── .gitignore
├── README.md
└── TODO.md                  # Deployment checklist
```

---

## 🧩 Example API Interaction Flow

1. Jamie enters **“Paris”**
2. Frontend calls → `/api/weather?city=Paris`
3. Backend:

   * Gets lat/lon via geocoding
   * Calls Open-Meteo for current weather
   * Returns formatted data
4. UI displays:

   ```
   Paris
   ☀️ 18°C, Clear sky
   💨 Wind: 7 km/h
   💧 Humidity: 60%
   ```

---

## 🚀 Future Enhancements

* Save favorite cities (auth + DB)
* Hourly/weekly forecasts
* Dark/light mode toggle
* PWA for offline use
* Voice search (“What’s the weather in Tokyo?”)
* Map view with weather overlays

---

## 📋 Deployment Guide

### Prerequisites
- GitHub account
- Render account (render.com)
- Netlify account (netlify.com)

### Step 1: Deploy Backend to Render
1. Push your code to GitHub repository
2. Go to [Render.com](https://render.com) and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: `weather-now-backend`
   - **Root Directory**: `server/`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `NODE_ENV=production`
6. Click "Create Web Service"
7. Note the deployed URL (e.g., `https://weather-now-backend.onrender.com`)

### Step 2: Deploy Frontend to Netlify
1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Configure:
   - **Base directory**: `client/`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Add environment variable:
   - **Key**: `REACT_APP_API_BASE_URL`
   - **Value**: `https://weather-now-backend.onrender.com` (your Render URL)
6. Click "Deploy site"
7. Note the deployed URL (e.g., `https://amazing-site.netlify.app`)

### Step 3: Verify Deployment
1. Visit your Netlify URL
2. Search for a city (e.g., "London")
3. Weather data should load from your Render backend
4. Check browser console for any CORS or API errors

### Troubleshooting
- **CORS Issues**: Update `server/app.js` to allow your Netlify domain in CORS origins
- **API Errors**: Check Render logs for backend issues
- **Build Failures**: Ensure all dependencies are in `package.json` files

---
