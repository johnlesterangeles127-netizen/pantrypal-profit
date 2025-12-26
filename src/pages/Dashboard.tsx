import { PageLayout } from '@/components/layout/PageLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { DollarSign, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { mockIngredients, mockDailyStats } from '@/data/mockData';

export default function Dashboard() {
  const todaySales = 2450;
  const todayExpenses = 780;
  const todayProfit = todaySales - todayExpenses;
  const inventoryValue = mockIngredients.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Overview of your restaurant's performance"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Sales"
          value={`₱${todaySales.toLocaleString()}`}
          change="+12% from yesterday"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success/10"
          delay={0}
        />
        <StatCard
          title="Today's Expenses"
          value={`₱${todayExpenses.toLocaleString()}`}
          change="+5% from yesterday"
          changeType="negative"
          icon={TrendingDown}
          iconBg="bg-destructive/10"
          delay={100}
        />
        <StatCard
          title="Today's Profit"
          value={`₱${todayProfit.toLocaleString()}`}
          change="+18% from yesterday"
          changeType="positive"
          icon={DollarSign}
          iconBg="bg-primary/10"
          delay={200}
        />
        <StatCard
          title="Inventory Value"
          value={`₱${inventoryValue.toFixed(2)}`}
          change={`${mockIngredients.length} items tracked`}
          changeType="neutral"
          icon={Package}
          iconBg="bg-accent/10"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={mockDailyStats} title="Weekly Performance" />
        </div>
        <div className="space-y-6">
          <RecentActivity />
        </div>
      </div>

      <div className="mt-6">
        <LowStockAlert ingredients={mockIngredients} />
      </div>
    </PageLayout>
  );
}
