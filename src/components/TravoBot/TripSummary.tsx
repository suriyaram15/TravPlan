
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, IndianRupee, MapPin, Route } from "lucide-react";

interface TripSummaryProps {
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  estimatedKms: number;
  totalDays: number;
}

export function TripSummary({
  destination,
  startDate,
  endDate,
  totalBudget,
  estimatedKms,
  totalDays,
}: TripSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Trip to {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Dates</p>
              <p>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p>₹{totalBudget.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p>{estimatedKms} km</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Days</p>
              <p>{totalDays} days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
