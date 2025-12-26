import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expense } from '@/types/inventory';
import { expenseCategories } from '@/data/mockData';

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
  onSave: (expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseDialog({ open, onOpenChange, expense, onSave }: ExpenseDialogProps) {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: 0,
    date: new Date(),
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        category: expense.category,
        amount: expense.amount,
        date: expense.date,
      });
    } else {
      setFormData({
        description: '',
        category: '',
        amount: 0,
        date: new Date(),
      });
    }
  }, [expense, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Weekly vegetable supply"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₱)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {expense ? 'Update' : 'Add'} Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
