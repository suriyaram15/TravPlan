
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { generateTravoBotPlan } from '@/services/ai-service';
import { useToast } from '@/hooks/use-toast';
import { TravoBotPlan } from '@/types';
import { TravoBotResult } from './TravoBotResult';
import { 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Heart, 
  Loader2,
  User,
  Info
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const interestOptions = [
  'Cultural',
  'Food',
  'Nature',
  'Spiritual',
  'Adventure',
  'History',
  'Shopping',
  'Beaches',
  'Mountains',
  'Temples',
  'Wildlife'
];

const groupOptions = [
  { value: 'solo', label: 'Solo' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'friends', label: 'Friends' }
];

interface ChatTripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
  travelers: number;
  travelMode: string;
}

const TravoBotForm = () => {
  // Basic form fields
  const [userName, setUserName] = useState('');
  const [startCity, setStartCity] = useState('');
  const [destinations, setDestinations] = useState('');
  const [numDays, setNumDays] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(15000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [groupType, setGroupType] = useState('solo');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravoBotPlan | null>(null);
  const [fromChat, setFromChat] = useState(false);
  
  const { toast } = useToast();
  
  // Check if there's data from the chat
  useEffect(() => {
    const tripDetailsFromChat = localStorage.getItem('tripDetails');
    if (tripDetailsFromChat) {
      try {
        const parsedDetails = JSON.parse(tripDetailsFromChat) as ChatTripDetails;
        
        // Set form fields from chat data
        setStartCity(parsedDetails.destination.split(',')[0] || ''); // Use first destination as start city
        setDestinations(parsedDetails.destination);
        setStartDate(parsedDetails.startDate);
        setEndDate(parsedDetails.endDate || '');
        setBudget(parsedDetails.budget || 15000);
        setSelectedInterests(parsedDetails.activities || []);
        setNumDays(parsedDetails.endDate ? 
          Math.max(1, Math.round((new Date(parsedDetails.endDate).getTime() - new Date(parsedDetails.startDate).getTime()) / (1000 * 60 * 60 * 24))) : 
          3);
        setGroupType(parsedDetails.travelers > 1 ? 'friends' : 'solo');
        setFromChat(true);
        
        // Clear the localStorage
        localStorage.removeItem('tripDetails');
        
        // Auto-generate plan
        if (parsedDetails.destination && parsedDetails.startDate) {
          setTimeout(() => {
            handleSubmit();
          }, 500);
        }
      } catch (error) {
        console.error("Error parsing trip details from chat:", error);
      }
    }
  }, []);
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast({
          title: "Interest limit reached",
          description: "You can select up to 5 interests",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!startCity.trim()) {
      toast({
        title: "Starting city required",
        description: "Please enter a starting city",
        variant: "destructive"
      });
      return;
    }
    
    if (!destinations.trim()) {
      toast({
        title: "Destinations required",
        description: "Please enter at least one destination",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedInterests.length === 0) {
      toast({
        title: "Interests required",
        description: "Please select at least one interest",
        variant: "destructive"
      });
      return;
    }
    
    if (!startDate) {
      toast({
        title: "Start date required",
        description: "Please select a start date for your trip",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const destinationList = destinations.split(',').map(d => d.trim());
      
      const plan = await generateTravoBotPlan({
        startCity,
        destinations: destinationList,
        numDays,
        totalBudget: budget,
        interests: selectedInterests,
        groupType: groupType as 'solo' | 'couple' | 'family' | 'friends',
        startDate,
        userName: userName || undefined
      });
      
      setTravelPlan(plan);
      
      toast({
        title: "Travel plan generated!",
        description: "Your personalized travel plan is ready.",
      });
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast({
        title: "Error generating plan",
        description: "There was a problem creating your travel plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setTravelPlan(null);
  };
  
  if (travelPlan) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <Button 
          variant="outline" 
          onClick={resetForm} 
          className="mb-4"
        >
          Create New Plan
        </Button>
        <TravoBotResult plan={travelPlan} />
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="text-primary">TravoBot</span> AI Travel Planner
        </CardTitle>
        <CardDescription>
          Generate a personalized day-by-day travel itinerary based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fromChat && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Data imported from chat</AlertTitle>
            <AlertDescription>
              We've pre-filled the form based on your conversation with our travel assistant. Feel free to adjust any details before generating your plan.
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name input (optional) */}
            <div className="space-y-2">
              <Label htmlFor="userName" className="flex items-center gap-1">
                <User className="h-4 w-4" /> Your Name (Optional)
              </Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startCity" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Starting City
                </Label>
                <Input
                  id="startCity"
                  placeholder="e.g., Chennai"
                  value={startCity}
                  onChange={(e) => setStartCity(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destinations" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Destinations (comma-separated)
                </Label>
                <Input
                  id="destinations"
                  placeholder="e.g., Ooty, Kodaikanal"
                  value={destinations}
                  onChange={(e) => setDestinations(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> End Date (Optional)
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (e.target.value && startDate) {
                      const days = Math.max(1, Math.round(
                        (new Date(e.target.value).getTime() - new Date(startDate).getTime()) / 
                        (1000 * 60 * 60 * 24)
                      ));
                      setNumDays(days);
                    }
                  }}
                  min={startDate}
                  disabled={isLoading || !startDate}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numDays" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Number of Days: {numDays}
              </Label>
              <Slider
                id="numDays"
                min={1}
                max={14}
                step={1}
                value={[numDays]}
                onValueChange={(values) => setNumDays(values[0])}
                disabled={isLoading}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" /> Budget: ₹{budget.toLocaleString()}
              </Label>
              <Slider
                id="budget"
                min={5000}
                max={100000}
                step={1000}
                value={[budget]}
                onValueChange={(values) => setBudget(values[0])}
                disabled={isLoading}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> Interests (Select up to 5)
              </Label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleInterest(interest)}
                    disabled={isLoading}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="groupType" className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Group Type
              </Label>
              <Select
                value={groupType}
                onValueChange={setGroupType}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select group type" />
                </SelectTrigger>
                <SelectContent>
                  {groupOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Plan...
            </>
          ) : (
            'Generate Travel Plan'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TravoBotForm;
