# Deployment Plan: Backend to Render, Frontend to Netlify

## Completed Tasks
- [x] Updated `client/src/App.js` to use environment variable for API base URL
- [x] Created `client/.env.example` for API URL configuration
- [x] Updated `netlify.toml` to remove function redirects (frontend-only build)
- [x] Created `server/render.yaml` for Render deployment configuration
- [x] Installed server dependencies (npm install in server/)
- [x] Tested server locally (npm start in server/) - API responding correctly at http://localhost:5000/api/weather?city=London
- [x] Installed client dependencies (npm install in client/)
- [x] Started client locally (npm start in client/) - running on port 3000

## Pending Tasks
- [ ] Deploy server to Render via GitHub integration
- [ ] Set REACT_APP_API_BASE_URL in Netlify environment variables (use Render URL)
- [ ] Deploy client to Netlify via GitHub integration
- [ ] Test full integration (frontend calling Render backend)
- [ ] Update CORS in server/app.js if needed for Netlify domain
- [ ] Remove or ignore client/netlify/functions/ (optional cleanup)

## Deployment Instructions
1. **Deploy Backend to Render:**
   - Push your code to GitHub (if not already).
   - Go to Render.com, sign in, and create a new Web Service.
   - Connect your GitHub repo, select the `server/` directory as the root (or use the render.yaml config).
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variable: `NODE_ENV=production`
   - Deploy. Note the Render URL (e.g., https://your-app.onrender.com).

2. **Deploy Frontend to Netlify:**
   - Go to Netlify.com, sign in, and create a new site.
   - Connect your GitHub repo, set build directory to `client/`.
   - Build command: `npm run build`
   - Publish directory: `build`
   - Add environment variable: `REACT_APP_API_BASE_URL=https://your-render-app.onrender.com` (replace with actual Render URL).
   - Deploy.

3. **Post-Deployment:**
   - Test the Netlify site to ensure it calls the Render backend correctly.
   - If CORS issues arise, update `server/app.js` to allow the Netlify domain in CORS origins.
   - Optionally, remove `client/netlify/functions/` folder as it's no longer needed.

## Notes
- Server is ready for Render deployment with render.yaml
- Frontend now uses configurable API URL (defaults to localhost:5000 for dev)
- Netlify build ignores server-side code and functions
- Ensure Render URL is set in Netlify env vars after Render deployment
- Local testing shows backend API is working correctly
