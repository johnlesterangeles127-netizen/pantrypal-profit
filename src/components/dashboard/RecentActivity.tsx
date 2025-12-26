import { Package, Receipt, TrendingUp } from 'lucide-react';

const activities = [
  { type: 'sale', message: 'New sale: Margherita Pizza x3', time: '2 min ago', icon: TrendingUp },
  { type: 'expense', message: 'Expense recorded: Vegetable supply', time: '15 min ago', icon: Receipt },
  { type: 'inventory', message: 'Low stock alert: Basil', time: '1 hour ago', icon: Package },
  { type: 'sale', message: 'New sale: Pasta Carbonara x2', time: '2 hours ago', icon: TrendingUp },
  { type: 'inventory', message: 'Inventory updated: Chicken Breast', time: '3 hours ago', icon: Package },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="p-2 rounded-lg bg-primary/10">
              <activity.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
