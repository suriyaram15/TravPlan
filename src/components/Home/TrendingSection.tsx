
import { useState, useEffect } from "react";
import { getTrending } from "@/data/destinations";
import { Destination } from "@/types";
import DestinationCard from "@/components/Destinations/DestinationCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingSection = () => {
  const [trending, setTrending] = useState<Destination[]>([]);

  useEffect(() => {
    // Fetch trending destinations
    setTrending(getTrending().slice(0, 4));
  }, []);

  return (
    <section className="travel-section bg-gray-50">
      <div className="travel-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="section-title">Trending Destinations</h2>
            <p className="section-subtitle">
              Discover the most popular travel spots across India
            </p>
          </div>
          <Link to="/destinations">
            <Button variant="link" className="text-travel-blue">
              View all destinations <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Destination cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
