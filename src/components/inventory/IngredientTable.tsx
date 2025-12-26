import { Ingredient } from '@/types/inventory';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IngredientTableProps {
  ingredients: Ingredient[];
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (id: string) => void;
}

export function IngredientTable({ ingredients, onEdit, onDelete }: IngredientTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Name</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Quantity</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Unit Price</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Total Value</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => {
              const isLowStock = ingredient.quantity <= ingredient.minStock;
              return (
                <tr 
                  key={ingredient.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <p className="font-medium text-card-foreground">{ingredient.name}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" className="font-normal">
                      {ingredient.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "font-medium",
                      isLowStock ? "text-destructive" : "text-card-foreground"
                    )}>
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </td>
                  <td className="p-4 text-card-foreground">
                    ${ingredient.unitPrice.toFixed(2)}
                  </td>
                  <td className="p-4 font-medium text-card-foreground">
                    ${(ingredient.quantity * ingredient.unitPrice).toFixed(2)}
                  </td>
                  <td className="p-4">
                    {isLowStock ? (
                      <Badge variant="destructive">Low Stock</Badge>
                    ) : (
                      <Badge className="bg-success text-success-foreground">In Stock</Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(ingredient)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(ingredient.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
