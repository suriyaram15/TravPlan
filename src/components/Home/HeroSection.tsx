
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="Beautiful Indian landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="travel-container relative z-10 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover the Wonders of India
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Plan your perfect journey with our AI-powered travel assistant
          </p>

          {/* Search form */}
          <form 
            onSubmit={handleSearch} 
            className="flex flex-col md:flex-row gap-4 mb-8 max-w-xl"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-travel-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <Button type="submit" className="bg-travel-blue hover:bg-blue-700 py-3 px-6">
              Explore
            </Button>
          </form>

          <div className="space-x-4">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-800"
              onClick={() => navigate('/ai-planner')}
            >
              AI Trip Planner
            </Button>
            <Button 
              variant="link" 
              className="text-white"
              onClick={() => navigate('/destinations')}
            >
              Browse destinations <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
