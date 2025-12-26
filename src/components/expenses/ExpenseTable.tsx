import { Expense } from '@/types/inventory';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Ingredients: 'bg-primary/10 text-primary',
  Payroll: 'bg-chart-5/20 text-chart-5',
  Utilities: 'bg-warning/20 text-warning',
  Maintenance: 'bg-accent/10 text-accent',
  Marketing: 'bg-success/20 text-success',
  Other: 'bg-muted text-muted-foreground',
};

export function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Description</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Amount</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr 
                key={expense.id}
                className="border-b border-border hover:bg-muted/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="p-4">
                  <p className="font-medium text-card-foreground">{expense.description}</p>
                </td>
                <td className="p-4">
                  <Badge className={categoryColors[expense.category] || categoryColors.Other}>
                    {expense.category}
                  </Badge>
                </td>
                <td className="p-4 text-muted-foreground">
                  {format(expense.date, 'MMM dd, yyyy')}
                </td>
                <td className="p-4 text-right font-semibold text-destructive">
                  -₱{expense.amount.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(expense)}
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(expense.id)}
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
