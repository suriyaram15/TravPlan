
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { TravoBotBudgetChart } from "@/types";

interface BudgetChartProps {
  budgetData: TravoBotBudgetChart;
}

export function BudgetChartComponent({ budgetData }: BudgetChartProps) {
  // Format data for the budget chart
  const chartData = budgetData.labels.map((day, index) => ({
    name: day,
    Stay: budgetData.datasets.stay[index] || 0,
    Travel: budgetData.datasets.travel[index] || 0,
    Food: budgetData.datasets.food[index] || 0,
    Misc: budgetData.datasets.misc[index] || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Stay" stackId="a" fill="#8884d8" />
              <Bar dataKey="Travel" stackId="a" fill="#82ca9d" />
              <Bar dataKey="Food" stackId="a" fill="#ffc658" />
              <Bar dataKey="Misc" stackId="a" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
