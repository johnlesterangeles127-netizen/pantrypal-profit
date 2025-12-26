import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sale } from '@/types/inventory';

interface SaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale?: Sale | null;
  onSave: (sale: Omit<Sale, 'id'>) => void;
}

export function SaleDialog({ open, onOpenChange, sale, onSave }: SaleDialogProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 1,
    unitPrice: 0,
    total: 0,
    date: new Date(),
  });

  useEffect(() => {
    if (sale) {
      setFormData({
        itemName: sale.itemName,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice,
        total: sale.total,
        date: sale.date,
      });
    } else {
      setFormData({
        itemName: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
        date: new Date(),
      });
    }
  }, [sale, open]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      total: prev.quantity * prev.unitPrice
    }));
  }, [formData.quantity, formData.unitPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{sale ? 'Edit Sale' : 'Record New Sale'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              placeholder="e.g., Margherita Pizza"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price ($)</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label>Total</Label>
              <div className="h-10 px-3 py-2 bg-muted rounded-md flex items-center">
                <span className="font-semibold text-success">${formData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {sale ? 'Update' : 'Record'} Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
