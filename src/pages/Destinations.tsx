import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "@/components/Destinations/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Destination } from "@/types";
import { destinations, searchDestinations } from "@/data/destinations";
import { Search, Filter, ChevronDown } from "lucide-react";

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  
  // Extract unique regions and states for filters
  const regions = [...new Set(destinations.map(dest => dest.region))];
  const states = [...new Set(destinations.map(dest => dest.state))];
  
  useEffect(() => {
    let results = initialQuery 
      ? searchDestinations(initialQuery)
      : [...destinations];
    
    // Apply filters if selected
    if (selectedRegion) {
      results = results.filter(dest => dest.region === selectedRegion);
    }
    
    if (selectedState) {
      results = results.filter(dest => dest.state === selectedState);
    }
    
    setFilteredDestinations(results);
  }, [initialQuery, selectedRegion, selectedState]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilteredDestinations(searchDestinations(searchQuery));
    } else {
      setFilteredDestinations([...destinations]);
    }
  };
  
  const clearFilters = () => {
    setSelectedRegion(null);
    setSelectedState(null);
    setSearchQuery("");
    setFilteredDestinations([...destinations]);
  };
  
  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Explore Destinations
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover the most beautiful places across India
      </p>
      
      {/* Search and filter section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search destinations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <Button type="submit">Search</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </form>
        
        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-travel-blue focus:ring-travel-blue"
                  value={selectedRegion || ""}
                  onChange={(e) => setSelectedRegion(e.target.value || null)}
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-travel-blue focus:ring-travel-blue"
                  value={selectedState || ""}
                  onChange={(e) => setSelectedState(e.target.value || null)}
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <Button variant="ghost" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results count */}
        <div className="text-sm text-gray-500">
          Showing {filteredDestinations.length} destinations
        </div>
      </div>
      
      {/* Destinations grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(destination => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            No destinations found matching your criteria.
          </p>
          <Button onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Destinations;