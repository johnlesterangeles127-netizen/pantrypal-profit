import { AlertTriangle } from 'lucide-react';
import { Ingredient } from '@/types/inventory';

interface LowStockAlertProps {
  ingredients: Ingredient[];
}

export function LowStockAlert({ ingredients }: LowStockAlertProps) {
  const lowStockItems = ingredients.filter(item => item.quantity <= item.minStock);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Low Stock Alert</h3>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-card rounded-xl">
            <div>
              <p className="font-medium text-card-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-destructive">{item.quantity} {item.unit}</p>
              <p className="text-xs text-muted-foreground">Min: {item.minStock} {item.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
