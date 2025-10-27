## 🌤️ Project: **Weather Now**

### 🎯 Goal

Provide real-time, accurate weather information for any city — simple, fast, and mobile-friendly.

---

## 🧱 High-Level Architecture

```
         ┌─────────────────────────────┐
         │         Frontend (UI)       │
         │  React / Next.js + Tailwind │
         │─────────────────────────────│
         │  - Search city input        │
         │  - Display temperature,     │
         │    humidity, wind, etc.     │
         │  - Responsive design        │
         └──────────────┬──────────────┘
                        │ REST / GraphQL API
                        ▼
         ┌─────────────────────────────┐
         │        Backend Server       │
         │     Node.js + Express       │
         │─────────────────────────────│
         │  - Handles API requests     │
         │  - Calls Open-Meteo API     │
         │  - (Optional) Caches data   │
         │  - Error handling, rate     │
         │    limiting, logs           │
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

### 1. **Frontend (React / Next.js)**

**Purpose:**
Enable Jamie to search for a city and view weather details instantly.

**Features:**

* Input field to enter city name
* Display temperature, weather condition, humidity, wind speed
* Loader and error messages
* Responsive design for mobile/desktop
* Option to save favorite cities (optional enhancement)

**Tech Stack:**

* React or Next.js
* Tailwind CSS or Material UI
* Axios / Fetch API for backend communication
* Framer Motion for small UI animations

---

### 2. **Backend (Node.js + Express)**

**Purpose:**
Serve as a middle layer between the frontend and Open-Meteo API.

**Responsibilities:**

* Receive city name from frontend (`/api/weather?city=London`)
* Use a **geocoding API** (like Open-Meteo’s or OpenStreetMap’s Nominatim) to get latitude & longitude
* Fetch weather data from Open-Meteo API using coordinates
* Cache the response (Redis or in-memory)
* Return formatted JSON to frontend

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

## 📦 Folder Structure (MERN Example)

```
weather-now/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
│
├── server/                  # Express Backend
│   ├── routes/weather.js
│   ├── services/openMeteo.js
│   ├── utils/cache.js
│   ├── app.js
│   └── package.json
│
├── .env
├── docker-compose.yml
└── README.md
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
