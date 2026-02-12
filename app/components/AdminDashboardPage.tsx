import { useEffect, useState } from "react";
import { inventoryApi } from "~/utils/api";

interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export function AdminDashboardPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await inventoryApi.getAll();

        const mappedItems = (Array.isArray(data) ? data : []).map(
          (item: any) => ({
            _id: String(item._id),
            name: String(item.name ?? ""),
            category: String(item.category ?? ""),
            price: Number(item.price ?? 0),
            stock: Number(item.stock ?? 0),
            imageUrl: item.imageUrl ? String(item.imageUrl) : "",
          }),
        );

        setItems(mappedItems);
        setError("");
      } catch {
        setError("Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const updateField = (
    id: string,
    field: keyof Omit<InventoryItem, "_id">,
    value: string,
  ) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item._id !== id) return item;

        if (field === "price" || field === "stock") {
          return { ...item, [field]: value === "" ? 0 : Number(value) };
        }

        return { ...item, [field]: value };
      }),
    );
  };

  const saveItem = async (item: InventoryItem) => {
    if (!item.name.trim() || !item.category.trim()) {
      setError("Name and category are required.");
      return;
    }

    if (item.price < 0 || item.stock < 0) {
      setError("Price and stock must be non-negative.");
      return;
    }

    try {
      setSavingId(item._id);
      setError("");
      setSuccessMessage("");

      const payload = {
        name: item.name.trim(),
        category: item.category.trim(),
        price: Number(item.price),
        stock: Math.floor(Number(item.stock)),
        imageUrl: item.imageUrl?.trim() || undefined,
      };

      const response = await inventoryApi.updateById(item._id, payload);

      const updated = {
        _id: String(response?._id ?? item._id),
        name: String(response?.name ?? payload.name),
        category: String(response?.category ?? payload.category),
        price: Number(response?.price ?? payload.price),
        stock: Number(response?.stock ?? payload.stock),
        imageUrl: String(response?.imageUrl ?? payload.imageUrl ?? ""),
      };

      setItems((previous) =>
        previous.map((entry) => (entry._id === item._id ? updated : entry)),
      );
      setSuccessMessage(`Updated ${updated.name}`);
    } catch {
      setError("Failed to update inventory item.");
    } finally {
      setSavingId(null);
    }
  };

  const createItem = async () => {
    if (!newItem.name.trim() || !newItem.category.trim()) {
      setError("Name and category are required.");
      return;
    }

    const parsedPrice = Number(newItem.price);
    const parsedStock = Number(newItem.stock);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
      setError("Price and stock must be valid numbers.");
      return;
    }

    if (parsedPrice < 0 || parsedStock < 0) {
      setError("Price and stock must be non-negative.");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      setSuccessMessage("");

      const payload = {
        name: newItem.name.trim(),
        category: newItem.category.trim(),
        price: parsedPrice,
        stock: Math.floor(parsedStock),
        imageUrl: newItem.imageUrl.trim() || undefined,
      };

      const response = await inventoryApi.create(payload);

      const created: InventoryItem = {
        _id: String(response?._id ?? crypto.randomUUID()),
        name: String(response?.name ?? payload.name),
        category: String(response?.category ?? payload.category),
        price: Number(response?.price ?? payload.price),
        stock: Number(response?.stock ?? payload.stock),
        imageUrl: String(response?.imageUrl ?? payload.imageUrl ?? ""),
      };

      setItems((previous) => [created, ...previous]);
      setNewItem({
        name: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: "",
      });
      setSuccessMessage(`Created ${created.name}`);
    } catch {
      setError("Failed to create inventory item.");
    } finally {
      setIsCreating(false);
    }
  };

  const deleteItem = async (id: string, name: string) => {
    const shouldDelete = window.confirm(`Delete ${name}?`);
    if (!shouldDelete) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccessMessage("");

      await inventoryApi.deleteById(id);
      setItems((previous) => previous.filter((item) => item._id !== id));
      setSuccessMessage(`Deleted ${name}`);
    } catch {
      setError("Failed to delete inventory item.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and update inventory</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
            Loading inventory...
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">Add Inventory Item</h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(event) =>
                    setNewItem((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(event) =>
                    setNewItem((previous) => ({
                      ...previous,
                      category: event.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Category"
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={newItem.price}
                  onChange={(event) =>
                    setNewItem((previous) => ({
                      ...previous,
                      price: event.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Price"
                />
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={newItem.stock}
                  onChange={(event) =>
                    setNewItem((previous) => ({
                      ...previous,
                      stock: event.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Stock"
                />
                <input
                  type="text"
                  value={newItem.imageUrl}
                  onChange={(event) =>
                    setNewItem((previous) => ({
                      ...previous,
                      imageUrl: event.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Image URL (optional)"
                />
                <button
                  type="button"
                  onClick={createItem}
                  disabled={isCreating}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isCreating ? "Creating..." : "Add"}
                </button>
              </div>
            </div>

            {items.map((item) => (
              <div
                key={item._id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(event) =>
                      updateField(item._id, "name", event.target.value)
                    }
                    className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={item.category}
                    onChange={(event) =>
                      updateField(item._id, "category", event.target.value)
                    }
                    className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.price}
                    onChange={(event) =>
                      updateField(item._id, "price", event.target.value)
                    }
                    className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={item.stock}
                    onChange={(event) =>
                      updateField(item._id, "stock", event.target.value)
                    }
                    className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Stock"
                  />
                  <button
                    type="button"
                    onClick={() => saveItem(item)}
                    disabled={savingId === item._id}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {savingId === item._id ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteItem(item._id, item.name)}
                    disabled={deletingId === item._id}
                    className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {deletingId === item._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
                No inventory items found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
