
import { TravoBotPlan } from '@/types';
import { TripSummary } from './TripSummary';
import { DailyPlanCard } from './DailyPlanCard';
import { BudgetChartComponent } from './BudgetChart';

interface TravoBotResultProps {
  plan: TravoBotPlan;
}

export function TravoBotResult({ plan }: TravoBotResultProps) {
  return (
    <div className="space-y-6">
      {/* Trip Summary */}
      <TripSummary 
        destination={plan.summary.destination}
        startDate={plan.summary.start_date}
        endDate={plan.summary.end_date}
        totalBudget={plan.summary.total_budget}
        estimatedKms={plan.summary.estimated_kms}
        totalDays={plan.daily_plan.length}
      />

      {/* Daily Plans */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Daily Itinerary</h3>
        
        {plan.daily_plan.map((day) => (
          <DailyPlanCard key={day.day} plan={day} />
        ))}
      </div>

      {/* Budget Chart */}
      <BudgetChartComponent budgetData={plan.budget_chart} />
    </div>
  );
}
