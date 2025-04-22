# TravPlan: AI-Powered Itinerary Planner

**TravPlan** is an AI-driven web application that assists users in crafting personalized travel itineraries. By inputting preferences such as destination, duration, and budget, users receive tailored travel plans, enhancing their travel planning experience.

## 🌐 Live Demo

*Link to live demo (if available)*

## 📸 Screenshots

*Include relevant screenshots showcasing the application's interface and features.*

## 🛠️ Features

- **Personalized Itinerary Generation**: Input your travel preferences to receive a customized itinerary.
- **Interactive Map Integration**: Visualize destinations and routes on an interactive map.
- **Responsive Design**: Seamless experience across devices.
- **User Authentication**: Secure login and registration system.
- **Itinerary Management**: Save, edit, and manage multiple itineraries.

## 🧰 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Integration**: OpenAI API for itinerary generation
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Deployment**: Vercel (Frontend), Heroku (Backend)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **MongoDB** instance (local or cloud-based)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/suriyaram15/TravPlan-AI-Powered-Itinerary-Planner.git
   cd TravPlan-AI-Powered-Itinerary-Planner
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_PLACES_API_KEY=your_api_key
   OPEN_WEATHERMAP_API_KEY=your-api-key
   ```

4. **Run the application**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── App.tsx         # Root component
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## 🧪 Testing

*Instructions for running tests (if applicable).*

## 📦 Deployment

*Guidelines for deploying the application to platforms like Vercel or Heroku.*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.


## 📬 Contact

For questions or feedback, please contact [suriyaram15](https://github.com/suriyaram15).

---
