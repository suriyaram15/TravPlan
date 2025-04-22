
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { destinations } from "@/data/destinations";
import { getSmartSuggestions } from "@/services/ai-service";
import { Destination } from "@/types";
import NotFound from "./NotFound";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === id);
  const [similarDestinations, setSimilarDestinations] = useState<Destination[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (id) {
        setIsLoadingSuggestions(true);
        try {
          const suggestions = await getSmartSuggestions(id);
          setSimilarDestinations(suggestions);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }
    };

    fetchSuggestions();
  }, [id]);

  if (!destination) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <div className="travel-container py-8">
        {/* Hero Image and Basic Info */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-80 md:h-96">
          <img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{destination.name}</h1>
                <div className="flex items-center text-white/90 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.state}, {destination.region}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < destination.rating ? "text-yellow-400" : "text-gray-400"}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-white/90 text-sm">({destination.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button asChild variant="secondary">
                  <Link to={`/create-itinerary`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan Trip
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={`/ai-planner`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Planner
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Highlights */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-travel-blue">About {destination.name}</h2>
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-travel-blue">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-travel-orange/10 text-travel-orange p-1 mr-3 mt-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Price and Smart Suggestions */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="overflow-hidden border-travel-orange/20">
              <div className="bg-travel-orange/10 p-4 border-b border-travel-orange/20">
                <h3 className="text-lg font-semibold text-travel-orange">Starting Price</h3>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-3xl font-bold">₹{destination.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
                {destination.offer && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-green-700 font-medium">
                      Special Offer: {destination.offer.discount}% OFF
                    </p>
                    <p className="text-sm text-green-600">
                      Valid until {new Date(destination.offer.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/create-itinerary">Plan Your Trip</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Smart Suggestions */}
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold">AI-Powered Suggestions</h3>
              </div>
              
              {isLoadingSuggestions ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-md bg-gray-200"></div>
                      <div className="space-y-1 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : similarDestinations.length > 0 ? (
                <div className="space-y-3">
                  {similarDestinations.map((dest) => (
                    <Link 
                      key={dest.id} 
                      to={`/destinations/${dest.id}`}
                      className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name} 
                        className="h-12 w-12 rounded-md object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{dest.name}</h4>
                        <p className="text-sm text-gray-500">{dest.state}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No similar destinations found for this location.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DestinationDetail;
