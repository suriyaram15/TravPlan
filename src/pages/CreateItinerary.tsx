
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { addItinerary } from "@/data/itineraries";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState("");
  const [destinations, setDestinations] = useState([
    { destinationId: "", days: 1, activities: [""] }
  ]);

  const handleAddDestination = () => {
    setDestinations([...destinations, { destinationId: "", days: 1, activities: [""] }]);
  };

  const handleRemoveDestination = (index: number) => {
    const newDestinations = [...destinations];
    newDestinations.splice(index, 1);
    setDestinations(newDestinations);
  };

  const handleDestinationChange = (index: number, field: string, value: any) => {
    const newDestinations = [...destinations];
    newDestinations[index] = { ...newDestinations[index], [field]: value };
    setDestinations(newDestinations);
  };

  const handleActivityChange = (destIndex: number, activityIndex: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[destIndex].activities[activityIndex] = value;
    setDestinations(newDestinations);
  };

  const handleAddActivity = (destIndex: number) => {
    const newDestinations = [...destinations];
    newDestinations[destIndex].activities.push("");
    setDestinations(newDestinations);
  };

  const handleRemoveActivity = (destIndex: number, activityIndex: number) => {
    const newDestinations = [...destinations];
    newDestinations[destIndex].activities.splice(activityIndex, 1);
    setDestinations(newDestinations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startDate || !endDate || !budget) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Format dates to YYYY-MM-DD
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    // Create new itinerary
    const newItinerary = {
      userId: "user-1", // Hardcoded for now
      title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      destinations: destinations.map(dest => ({
        ...dest,
        days: Number(dest.days)
      })),
      totalBudget: Number(budget),
      isAIGenerated: false
    };

    // Add to itineraries
    addItinerary(newItinerary);
    
    toast({
      title: "Itinerary created",
      description: "Your itinerary has been created successfully!",
    });
    
    // Navigate to itineraries page
    navigate("/itineraries");
  };

  return (
    <MainLayout>
      <div className="travel-container py-8">
        <h1 className="text-3xl font-bold text-travel-blue mb-6">Create New Itinerary</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Add the basic details of your itinerary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Itinerary Title *
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., South Indian Adventure"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1">
                  Total Budget (₹) *
                </label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 45000"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Destinations</CardTitle>
              <CardDescription>Add the places you want to visit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {destinations.map((destination, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Destination {index + 1}</h3>
                    {destinations.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveDestination(index)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Location *
                      </label>
                      <Select 
                        value={destination.destinationId}
                        onValueChange={(value) => handleDestinationChange(index, "destinationId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="ooty">Ooty</SelectItem>
                          <SelectItem value="munnar">Munnar</SelectItem>
                          <SelectItem value="madurai">Madurai</SelectItem>
                          <SelectItem value="thanjavur">Thanjavur</SelectItem>
                          <SelectItem value="kumbakonam">Kumbakonam</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="kashmir">Kashmir</SelectItem>
                          <SelectItem value="jaipur">Jaipur</SelectItem>
                          <SelectItem value="varanasi">Varanasi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Number of Days *
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={destination.days}
                        onChange={(e) => handleDestinationChange(index, "days", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">
                      Activities
                    </label>
                    
                    {destination.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex gap-2">
                        <Input
                          value={activity}
                          onChange={(e) => handleActivityChange(index, actIndex, e.target.value)}
                          placeholder="e.g., Visit the beach"
                        />
                        {destination.activities.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveActivity(index, actIndex)}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddActivity(index)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Activity
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={handleAddDestination}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Another Destination
              </Button>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto">
                Create Itinerary
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateItinerary;
