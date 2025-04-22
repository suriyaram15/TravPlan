
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Cloud, MapPin } from "lucide-react";
import { TravoBotDailyPlan, TravoBotSpot } from "@/types";
import { DailyBudget } from "./DailyBudget";

interface DailyPlanCardProps {
  plan: TravoBotDailyPlan;
}

function TouristSpots({ spots }: { spots: TravoBotSpot[] }) {
  return (
    <div>
      <h4 className="font-medium mb-2">Places to Visit</h4>
      <ul className="space-y-3">
        {spots.map((spot, index) => (
          <li key={index} className="flex gap-2">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{spot.name}</p>
              <p className="text-sm text-muted-foreground">{spot.description}</p>
              <p className="text-xs text-muted-foreground mt-1">~{spot.distance_km} km</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Activities({ activities }: { activities: string[] }) {
  return (
    <div>
      <h4 className="font-medium mb-2">Recommended Activities</h4>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyPlanCard({ plan }: DailyPlanCardProps) {
  return (
    <Card key={plan.day} className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex flex-wrap items-center justify-between">
          <CardTitle className="text-lg">
            Day {plan.day}: {plan.location}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{new Date(plan.date).toLocaleDateString()}</span>
            <Cloud className="h-4 w-4 ml-2" />
            <span>{plan.weather.temperature}, {plan.weather.condition}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <TouristSpots spots={plan.spots} />
            <Activities activities={plan.activities} />
          </div>
          
          <div>
            <DailyBudget 
              stay={plan.budget.stay} 
              travel={plan.budget.travel} 
              food={plan.budget.food} 
              misc={plan.budget.misc} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
