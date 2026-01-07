import { Sale } from '@/types/inventory';
import { Pencil, Trash2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface SalesTableProps {
  sales: Sale[];
  onEdit: (sale: Sale) => void;
  onDelete: (id: string) => void;
}

export function SalesTable({ sales, onEdit, onDelete }: SalesTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Order #</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Items</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Total</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr 
                key={sale.id}
                className="border-b border-border hover:bg-muted/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-card-foreground">#{sale.id.padStart(4, '0')}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    {sale.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-card-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-muted-foreground ml-4">
                          ₱{(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  {format(sale.date, 'MMM dd, yyyy')}
                </td>
                <td className="p-4 text-right font-semibold text-success">
                  ₱{sale.total.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(sale)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(sale.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
