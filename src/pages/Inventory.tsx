import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { IngredientTable } from '@/components/inventory/IngredientTable';
import { IngredientDialog } from '@/components/inventory/IngredientDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { mockIngredients } from '@/data/mockData';
import { Ingredient } from '@/types/inventory';
import { toast } from 'sonner';

export default function Inventory() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(search.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<Ingredient, 'id' | 'lastUpdated'>) => {
    if (editingIngredient) {
      setIngredients(ingredients.map(ing =>
        ing.id === editingIngredient.id
          ? { ...ing, ...data, lastUpdated: new Date() }
          : ing
      ));
      toast.success('Ingredient updated successfully');
    } else {
      const newIngredient: Ingredient = {
        ...data,
        id: Date.now().toString(),
        lastUpdated: new Date(),
      };
      setIngredients([...ingredients, newIngredient]);
      toast.success('Ingredient added successfully');
    }
    setEditingIngredient(null);
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
    toast.success('Ingredient deleted successfully');
  };

  const handleAddNew = () => {
    setEditingIngredient(null);
    setDialogOpen(true);
  };

  return (
    <PageLayout
      title="Inventory"
      subtitle="Manage your restaurant's ingredients"
      actions={
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Ingredient
        </Button>
      }
    >
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <IngredientTable
        ingredients={filteredIngredients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <IngredientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ingredient={editingIngredient}
        onSave={handleSave}
      />
    </PageLayout>
  );
}
