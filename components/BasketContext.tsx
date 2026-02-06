"use client";
import { useAuth } from "./AuthContext";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface BasketItem extends Product {
  quantity: number;
}

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number, removeAll?: boolean) => void;
  getTotalPrice: () => number;
  updateQuantity: (productId: number, newQuantity: number) => void;
  addFromBasket: (productId: number) => void;
  getUniqueItemsCount: () => number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const { logged: isLoggedIn } = useAuth(); // useAuth to get logged state

  // get basket from localStorage or initialize it as an empty array
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedBasket = localStorage.getItem("basket");
        return storedBasket ? JSON.parse(storedBasket) : [];
      } catch (error) {
        console.error("Error loading basket from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // save basket to localStorage whenever it changes or updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("basket", JSON.stringify(basket));
      } catch (error) {
        console.error("Error saving basket to localStorage:", error);
      }
    }
  }, [basket]);

  const addToBasket = (product: Product) => {
    if (!isLoggedIn) {
      alert("You must log in first to add products to the basket.");
      return;
    }

    // Check if product already exists in basket and update quantity accordingly
    setBasket((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      return existingItem
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromBasket = (productId: number, removeAll = false) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: removeAll ? 0 : item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Function to increment quantity of a specific product in the basket
  const addFromBasket = (productId: number) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Function to update quantity of a specific product in the basket
  const updateQuantity = (productId: number, newQuantity: number) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Get the number of unique items in the basket
  const getUniqueItemsCount = () => basket.length;

  const getTotalPrice = () => {
    return basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        getTotalPrice,
        updateQuantity,
        addFromBasket,
        getUniqueItemsCount,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

// Custom Hook to use the BasketContext in other Components
export function useBasket() {
  const context = useContext(BasketContext);
  if (!context)
    throw new Error("useBasket must be used within a BasketProvider");
  return context;
}
