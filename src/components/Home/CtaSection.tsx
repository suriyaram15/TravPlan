
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-travel-blue to-blue-700 text-white">
      <div className="travel-container">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6 text-travel-orange" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to plan your dream vacation?
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Let our AI-powered planner create a personalized itinerary just for you.
            Discover amazing destinations, get intelligent suggestions, and make
            unforgettable memories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/ai-planner')}
              className="bg-travel-orange hover:bg-orange-600 text-white px-6 py-6 text-lg"
            >
              Create Your Itinerary <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/destinations')}
              className="border-white text-white hover:bg-white hover:text-travel-blue px-6 py-6 text-lg"
            >
              Explore Destinations <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
