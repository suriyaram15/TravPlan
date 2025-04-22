import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getAllItineraries } from "@/data/itineraries";
import { Calendar, MapPin, Plus, Search } from "lucide-react";
import { format, parseISO } from "date-fns";

const Itineraries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const allItineraries = getAllItineraries();
  
  // Filter itineraries based on search term
  const filteredItineraries = allItineraries.filter(itinerary => 
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Separate AI-generated and user-created itineraries
  const aiItineraries = filteredItineraries.filter(itinerary => itinerary.isAIGenerated);
  const userItineraries = filteredItineraries.filter(itinerary => !itinerary.isAIGenerated);

  return (
    <div className="py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-travel-blue">Your Itineraries</h1>
          <p className="text-gray-600 mt-2">Manage and explore your travel plans</p>
        </div>
        
        <div className="flex gap-3 self-start">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search itineraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-[250px]"
            />
          </div>
          
          <Button asChild>
            <Link to="/create-itinerary">
              <Plus className="h-4 w-4 mr-2" /> Create New
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Itineraries</TabsTrigger>
          <TabsTrigger value="ai">AI Generated</TabsTrigger>
          <TabsTrigger value="user">Your Creations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredItineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
          ) : (
            <EmptyState searchTerm={searchTerm} />
          )}
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          {aiItineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
          ) : (
            <EmptyState type="ai" searchTerm={searchTerm} />
          )}
        </TabsContent>
        
        <TabsContent value="user" className="space-y-6">
          {userItineraries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
          ) : (
            <EmptyState type="user" searchTerm={searchTerm} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ItineraryCard = ({ itinerary }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{itinerary.title}</CardTitle>
          {itinerary.isAIGenerated && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-medium">
              AI Generated
            </span>
          )}
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {format(parseISO(itinerary.startDate), "MMM d")} - {format(parseISO(itinerary.endDate), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {itinerary.destinations.map((dest, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                <MapPin className="h-3.5 w-3.5 mr-1 text-travel-orange" />
                {dest.destinationId.charAt(0).toUpperCase() + dest.destinationId.slice(1)}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">Budget:</span> ₹{itinerary.totalBudget.toLocaleString()}
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">Created:</span> {format(parseISO(itinerary.createdAt), "MMM d, yyyy")}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/itineraries/${itinerary.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyState = ({ type = "all", searchTerm = "" }) => {
  if (searchTerm) {
    return (
      <div className="text-center py-10">
        <Search className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No itineraries found</h3>
        <p className="text-gray-600 mt-2">
          We couldn't find any itineraries matching "{searchTerm}"
        </p>
      </div>
    );
  }

  let message = "You haven't created any itineraries yet.";
  if (type === "ai") {
    message = "You don't have any AI-generated itineraries yet.";
  } else if (type === "user") {
    message = "You haven't created any personal itineraries yet.";
  }

  return (
    <div className="text-center py-10">
      <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900">No itineraries yet</h3>
      <p className="text-gray-600 mt-2">{message}</p>
      <Button asChild className="mt-4">
        <Link to="/create-itinerary">
          <Plus className="h-4 w-4 mr-2" /> Create New Itinerary
        </Link>
      </Button>
    </div>
  );
};

export default Itineraries;