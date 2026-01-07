import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TopProduct {
  name: string;
  sold: number;
  revenue: number;
}

interface TopProductsChartProps {
  data: TopProduct[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(142 71% 45%)',
  'hsl(142 64% 35%)',
  'hsl(142 55% 28%)',
];

export function TopProductsChart({ data }: TopProductsChartProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Top Selling Products</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis 
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              width={100}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number, name: string) => [
                name === 'sold' ? `${value} units` : `₱${value.toLocaleString()}`,
                name === 'sold' ? 'Units Sold' : 'Revenue'
              ]}
            />
            <Bar
              dataKey="sold"
              name="sold"
              radius={[0, 4, 4, 0]}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
