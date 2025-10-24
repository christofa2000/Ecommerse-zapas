import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity"> & { qty?: number }) => void;
  remove: (id: string, size: string) => void;
  increment: (id: string, size: string) => void;
  decrement: (id: string, size: string) => void;
  clear: () => void;
  getItemQuantity: (id: string, size: string) => number;
  getSubtotal: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => {
        const { items } = get();
        const quantity = item.qty || 1;
        const existingItem = items.find(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity }] });
        }
      },

      remove: (id, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        });
      },

      increment: (id, size) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrement: (id, size) => {
        const { items } = get();
        const item = items.find((i) => i.id === id && i.size === size);

        if (item && item.quantity > 1) {
          set({
            items: items.map((i) =>
              i.id === id && i.size === size
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          });
        } else {
          get().remove(id, size);
        }
      },

      clear: () => {
        set({ items: [] });
      },

      getItemQuantity: (id, size) => {
        const item = get().items.find((i) => i.id === id && i.size === size);
        return item?.quantity || 0;
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
