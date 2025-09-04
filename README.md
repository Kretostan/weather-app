# Weather App ☀️🌧️❄️

A full-stack weather application that provides real-time weather updates for any location.
Users can easily switch between Celsius and Fahrenheit, while the app’s UI is clean, responsive, and animated.
The backend is powered by Express.js and deployed with Firebase Functions.

## 🚀 Features

- 🔎 Search weather by city name

- 🌡️ Toggle between Celsius (°C) and Fahrenheit (°F)

- 📱 Responsive design with Tailwind CSS

- 🎨 Smooth UI animations with Framer Motion

- ⚡ Fast performance thanks to Vite + TypeScript

- ☁️ Backend with Express.js + Firebase Functions

## 🛠️ Tech Stack
### Frontend

- React 19, React Router 7

- Tailwind CSS 4

- Framer Motion 12

- Axios

- Vite 7

- TypeScript

### Backend

- Node.js + Express 5

- Firebase Functions + Firebase Admin

- Axios

- dotenv

- cors

## ⚡ Installation & Setup
### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install dependencies
**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd server
npm install
```

### 3. Configure environment variables
**Frontend** (```client/.env```)
```env
VITE_API_KEY=your_weather_api_key
VITE_BACKEND_URL=http://localhost:5000
```

**Backend** (```server/.env```)
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### 4. Run the project
**Frontend**
```bash
npm run dev
```

Available at: ```http://localhost:5173```

**Backend**
```bash
npm run serve
```

(uses Firebase Functions local emulator)
