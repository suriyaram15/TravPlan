
import { Coffee, Bus, Utensils, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DailyBudgetProps {
  stay: number;
  travel: number;
  food: number;
  misc: number;
}

export function DailyBudget({ stay, travel, food, misc }: DailyBudgetProps) {
  const total = stay + travel + food + misc;
  
  return (
    <div className="space-y-2">
      <h4 className="font-medium mb-2">Daily Budget</h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-muted-foreground" />
            <span>Stay</span>
          </div>
          <span>₹{stay.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="h-4 w-4 text-muted-foreground" />
            <span>Travel</span>
          </div>
          <span>₹{travel.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-muted-foreground" />
            <span>Food</span>
          </div>
          <span>₹{food.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span>Miscellaneous</span>
          </div>
          <span>₹{misc.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
