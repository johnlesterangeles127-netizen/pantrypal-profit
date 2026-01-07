import { PageLayout } from '@/components/layout/PageLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Package, Printer } from 'lucide-react';
import { mockIngredients, mockExpenses, mockSales, mockMonthlyStats } from '@/data/mockData';
import { printAllData } from '@/utils/printReport';

export default function Dashboard() {
  const currentMonth = mockMonthlyStats[mockMonthlyStats.length - 1];
  const monthlySales = currentMonth?.sales || 0;
  const monthlyExpenses = currentMonth?.expenses || 0;
  const monthlyProfit = currentMonth?.profit || 0;
  const inventoryValue = mockIngredients.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const handlePrint = () => {
    printAllData({
      ingredients: mockIngredients,
      expenses: mockExpenses,
      sales: mockSales,
      monthlyStats: mockMonthlyStats
    });
  };

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Overview of your restaurant's performance"
      actions={
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print Report
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Sales"
          value={`₱${monthlySales.toLocaleString()}`}
          change="+8% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success/10"
          delay={0}
        />
        <StatCard
          title="Monthly Expenses"
          value={`₱${monthlyExpenses.toLocaleString()}`}
          change="+3% from last month"
          changeType="negative"
          icon={TrendingDown}
          iconBg="bg-destructive/10"
          delay={100}
        />
        <StatCard
          title="Monthly Profit"
          value={`₱${monthlyProfit.toLocaleString()}`}
          change="+12% from last month"
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
          <SalesChart data={mockMonthlyStats} title="Monthly Performance" />
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
