
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from './pages/Index';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Itineraries from './pages/Itineraries';
import ItineraryDetail from './pages/ItineraryDetail';
import CreateItinerary from './pages/CreateItinerary';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TravelBlogs from './pages/TravelBlogs';
import BlogDetail from './pages/BlogDetail';
import TravoBot from './pages/TravoBot';
import NotFound from './pages/NotFound';
import MainLayout from './components/Layout/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <Router>
            <Helmet>
              <title>Travel India - Discover Magical India</title>
              <meta name="description" content="Discover and plan your dream vacation in India with our curated destinations and AI-powered trip planner" />
            </Helmet>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="destinations" element={<Destinations />} />
                <Route path="destinations/:id" element={<DestinationDetail />} />
                <Route path="itineraries" element={<Itineraries />} />
                <Route path="itineraries/:id" element={<ItineraryDetail />} />
                <Route path="create-itinerary" element={<CreateItinerary />} />
                <Route path="travobot" element={<TravoBot />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blogs" element={<TravelBlogs />} />
                <Route path="blogs/:id" element={<BlogDetail />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
