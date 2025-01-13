import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../../types/product";

// Тип контекста для избранных товаров
interface FavoriteContextType {
  favoriteProducts: Product[];
  addFavoriteProduct: (product: Product) => void;
  removeFavoriteProduct: (productId: number) => void;
  clearFavorites: () => void;  // Add clearFavorites to the interface
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favoriteProducts: [],
  addFavoriteProduct: () => {},
  removeFavoriteProduct: () => {},
  clearFavorites: () => {},  // Provide an empty function as default
});

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteProducts");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavoriteProducts(parsedFavorites);
        } else {
          console.error("Invalid data format in localStorage for favorites.");
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (favoriteProducts.length > 0) {
      try {
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
      } catch (error) {
        console.error("Error saving favorites to localStorage", error);
      }
    }
  }, [favoriteProducts]);

  // Add product to favorites
  const addFavoriteProduct = (product: Product) => {
    setFavoriteProducts((prev) => {
      if (!prev.some((fav) => fav.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  // Remove product from favorites
  const removeFavoriteProduct = (productId: number) => {
    setFavoriteProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  // Clear all favorite products
  const clearFavorites = () => {
    setFavoriteProducts([]);
    localStorage.removeItem("favoriteProducts");
  };

  return (
    <FavoriteContext.Provider value={{ favoriteProducts, addFavoriteProduct, removeFavoriteProduct, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};
