
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { getItineraryById } from "@/data/itineraries";
import { Itinerary } from "@/types";

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundItinerary = getItineraryById(id);
      setItinerary(foundItinerary || null);
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="travel-container py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse text-xl text-gray-500">Loading itinerary...</div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!itinerary) {
    return (
      <MainLayout>
        <div className="travel-container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Itinerary not found</h1>
            <p className="text-gray-600 mb-6">The itinerary you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/itineraries">Back to Itineraries</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const totalDays = itinerary.destinations.reduce((acc, dest) => acc + dest.days, 0);
  
  return (
    <MainLayout>
      <div className="travel-container py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/itineraries">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Itineraries
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-travel-blue">{itinerary.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(parseISO(itinerary.startDate), "MMM d")} - {format(parseISO(itinerary.endDate), "MMM d, yyyy")}
                </span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                <span>{totalDays} days</span>
              </div>
            </div>
            
            {itinerary.isAIGenerated && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                AI Generated
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Day-by-Day</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Itinerary Overview</CardTitle>
                    <CardDescription>
                      A summary of your travel plan across {totalDays} days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Destinations</h3>
                        <div className="flex flex-wrap gap-2">
                          {itinerary.destinations.map((dest, index) => (
                            <div key={index} className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-travel-orange" />
                              {dest.destinationId.charAt(0).toUpperCase() + dest.destinationId.slice(1)}
                              <span className="ml-1 text-gray-500">({dest.days} days)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Budget</h3>
                        <p className="text-gray-700">
                          Total budget: <span className="font-semibold">₹{itinerary.totalBudget.toLocaleString()}</span>
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Created</h3>
                        <p className="text-gray-700">
                          {format(parseISO(itinerary.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6">
                {itinerary.destinations.map((destination, destIndex) => (
                  <Card key={destIndex}>
                    <CardHeader>
                      <CardTitle>
                        {destination.destinationId.charAt(0).toUpperCase() + destination.destinationId.slice(1)}
                      </CardTitle>
                      <CardDescription>
                        {destination.days} {destination.days === 1 ? 'day' : 'days'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Array.from({ length: destination.days }).map((_, dayIndex) => (
                          <div key={dayIndex} className="border-l-2 border-travel-blue pl-4 py-1">
                            <h4 className="font-medium">Day {dayIndex + 1}</h4>
                            <ul className="mt-2 space-y-2">
                              {destination.activities.slice(0, 3).map((activity, actIndex) => (
                                <li key={actIndex} className="text-gray-700">
                                  • {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Download PDF</Button>
                <Button variant="outline" className="w-full">Share Itinerary</Button>
                <Button variant="outline" className="w-full">Edit Itinerary</Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Travel Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-travel-blue">
                    Remember to check weather forecasts for each destination before packing!
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-travel-blue">
                    Keep digital and physical copies of important documents.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-travel-blue">
                    Try local cuisines for an authentic experience!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ItineraryDetail;
