# TravPlan: AI-Powered Itinerary Planner

TravPlan is a smart, AI-driven travel itinerary planner that generates personalized travel plans based on your input preferences like destination, budget, duration, and more. Powered by OpenAI, Google Places, and OpenWeatherMap, this tool helps you explore, plan, and experience your journeys like never before.

## 🌐 Live Demo

[TravPlan](https://travplan-ai-powered-itinerary-planner.vercel.app/)

---

## 📸 Screenshots

<p float="left">
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/1.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/2.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/3.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/4.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/5.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/6.png" width="250"/>
  <img src="https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner/blob/main/public/7.png" width="250"/>
</p>

---

## 💻 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Runtime**: Bun
- **APIs**:
  - OpenAI (for AI-generated itineraries)
  - Google Places (for location data)
  - OpenWeatherMap (for weather data)

---

## 🚀 Features

- 🔮 AI-generated day-wise travel itineraries
- 📍 Intelligent destination recommendations
- ☁️ Real-time weather integration
- 🧠 Collaborative and content-based filtering for suggestions
- 🔐 Secure API usage with environment variables
- 📱 Responsive and user-friendly UI

---

## 🛠️ Getting Started

### 1. Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.sh/) (Node.js alternative)
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner.git
cd TravPlan-AI-Powered-Itinerary-Planner
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
OPENAI_API_KEY=your_openai_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
OPEN_WEATHERMAP_API_KEY=your_openweathermap_api_key
```

> 🔒 Never share your API keys publicly.

### 5. Run the App

```bash
bun run dev
```

Now, navigate to `http://localhost:5173` in your browser to use the app.

---

## 📁 Project Structure

```bash
TravPlan-AI-Powered-Itinerary-Planner/
├── public/                  # Static files and screenshots
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── api/                 # API call logic (e.g. OpenAI, Google, Weather)
│   └── App.tsx              # Main React App
├── .env                     # API keys
├── package.json
├── bun.lockb
└── vite.config.ts
```

---

## 📌 Notes

- Make sure your APIs are enabled and not restricted by IP or domain.
- You can use `.env.local` for development secrets.
- Supports modern browsers and mobile responsiveness.

---

## 🙌 Acknowledgements

- [OpenAI](https://openai.com/)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [OpenWeatherMap](https://openweathermap.org/api)
- [Bun](https://bun.sh/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Feel free to star ⭐ this repo and contribute!
