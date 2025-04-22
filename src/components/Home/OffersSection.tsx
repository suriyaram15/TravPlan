
import { useState, useEffect } from "react";
import { getOffers } from "@/data/destinations";
import { Destination } from "@/types";
import DestinationCard from "@/components/Destinations/DestinationCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const OffersSection = () => {
  const [offers, setOffers] = useState<Destination[]>([]);

  useEffect(() => {
    // Fetch destinations with offers
    setOffers(getOffers().slice(0, 3));
  }, []);

  return (
    <section className="travel-section">
      <div className="travel-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="section-title">Hot Deals & Offers</h2>
            <p className="section-subtitle">
              Limited-time discounts on amazing destinations
            </p>
          </div>
          <Link to="/offers">
            <Button variant="link" className="text-travel-blue">
              View all offers <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Destination cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((destination) => (
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

export default OffersSection;
