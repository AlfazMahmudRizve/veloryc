import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    slug: string; // For linking back
}

interface CartState {
    isOpen: boolean;
    items: CartItem[];
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
    isOpen: false,
    items: [],
    total: 0,
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.id === newItem.id);
        let newItems;
        if (existingItem) {
            newItems = state.items.map(item =>
                item.id === newItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newItems = [...state.items, { ...newItem, quantity: 1 }];
        }

        // Recalculate total
        const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return { items: newItems, total: newTotal, isOpen: true }; // Open cart on add
    }),
    removeItem: (id) => set((state) => {
        const newItems = state.items.filter(item => item.id !== id);
        const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return { items: newItems, total: newTotal };
    })
}));
