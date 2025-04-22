
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import TravoBotForm from '@/components/TravoBot/TravoBot';

const TravoBot: React.FC = () => {
  return (
    <Container className="py-8">
      <Helmet>
        <title>TravoBot - AI Travel Assistant | Travel India</title>
        <meta name="description" content="Get personalized travel plans with our AI-powered travel assistant. Just input your preferences and let TravoBot create your dream Indian vacation." />
        <meta name="keywords" content="India travel, AI travel planner, personalized itinerary, travel assistant, India vacation, budget travel" />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Plan Your Perfect Trip with <span className="text-primary">TravoBot</span>
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Our AI travel assistant helps you create personalized itineraries based on your preferences, budget, and travel style.
        </p>
        
        <TravoBotForm />
      </div>
    </Container>
  );
};

export default TravoBot;
