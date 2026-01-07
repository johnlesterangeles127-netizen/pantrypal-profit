import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sale, SaleItem } from '@/types/inventory';
import { Plus, Trash2 } from 'lucide-react';

interface SaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale?: Sale | null;
  onSave: (sale: Omit<Sale, 'id'>) => void;
}

const emptyItem: SaleItem = { name: '', quantity: 1, unitPrice: 0 };

export function SaleDialog({ open, onOpenChange, sale, onSave }: SaleDialogProps) {
  const [items, setItems] = useState<SaleItem[]>([{ ...emptyItem }]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (sale) {
      setItems(sale.items);
      setDate(sale.date);
    } else {
      setItems([{ ...emptyItem }]);
      setDate(new Date());
    }
  }, [sale, open]);

  const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

  const handleAddItem = () => {
    setItems([...items, { ...emptyItem }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: keyof SaleItem, value: string | number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = items.filter(item => item.name.trim() !== '');
    if (validItems.length === 0) return;
    
    onSave({
      items: validItems,
      total,
      date,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{sale ? 'Edit Sale' : 'Record New Sale'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Order Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="gap-1">
                <Plus className="w-3 h-3" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <div className="w-20">
                        <Input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Unit Price (₱)"
                          value={item.unitPrice || ''}
                          onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>
                      <div className="w-24 flex items-center justify-end text-sm font-medium text-muted-foreground">
                        ₱{(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    disabled={items.length === 1}
                    className="hover:bg-destructive/10 hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date instanceof Date ? date.toISOString().split('T')[0] : ''}
                onChange={(e) => setDate(new Date(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Order Total</Label>
              <div className="h-10 px-3 py-2 bg-primary/10 rounded-md flex items-center">
                <span className="font-bold text-primary text-lg">₱{total.toFixed(2)}</span>
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
