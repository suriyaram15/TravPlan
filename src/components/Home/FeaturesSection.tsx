
import { 
  Sparkles, 
  Map, 
  Hotel, 
  Plane, 
  Ticket, 
  MessageSquare, 
  ShieldCheck, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-travel-blue" />,
    title: "AI Trip Planning",
    description: "Create personalized itineraries with our smart AI assistant that understands your preferences."
  },
  {
    icon: <Map className="h-10 w-10 text-travel-orange" />,
    title: "Curated Destinations",
    description: "Explore handpicked destinations across India, from hill stations to beaches and cultural hotspots."
  },
  {
    icon: <Hotel className="h-10 w-10 text-travel-green" />,
    title: "Accommodation Options",
    description: "Find the perfect place to stay with options ranging from luxury resorts to budget-friendly homestays."
  },
  {
    icon: <Plane className="h-10 w-10 text-travel-blue" />,
    title: "Travel Booking",
    description: "Book flights, trains and local transportation seamlessly through our platform."
  },
  {
    icon: <Ticket className="h-10 w-10 text-travel-orange" />,
    title: "Attraction Tickets",
    description: "Skip the lines with pre-booked tickets to popular attractions and experiences."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-travel-green" />,
    title: "Travel Community",
    description: "Connect with fellow travelers, share experiences and get insider tips from locals."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-travel-blue" />,
    title: "Safe Travel",
    description: "Get up-to-date safety information and travel advisories for all destinations."
  },
  {
    icon: <Clock className="h-10 w-10 text-travel-orange" />,
    title: "24/7 Support",
    description: "Our customer support team is available round the clock to assist with any issues."
  }
];

const FeaturesSection = () => {
  return (
    <section className="travel-section">
      <div className="travel-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose TravelZenith</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Our AI-powered platform makes travel planning easy, efficient, and tailored to your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
