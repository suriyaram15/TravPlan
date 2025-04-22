
import { Link } from "react-router-dom";
import { Destination } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link to={`/destinations/${destination.id}`} className="destination-card group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Offer badge if available */}
        {destination.offer && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-travel-orange text-white">
              {destination.offer.discount}% OFF
            </Badge>
          </div>
        )}
        
        {/* Trending badge */}
        {destination.trending && !destination.offer && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-travel-green text-white">
              Trending
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-travel-blue transition-colors">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-current h-4 w-4" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{destination.state}, {destination.region}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {destination.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-travel-blue font-bold">
            ₹{destination.price.toLocaleString()}
            <span className="text-gray-500 font-normal text-sm"> /person</span>
          </div>
          <span className="text-sm text-gray-500">{destination.reviews} reviews</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
