import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../../types/product";

// Тип контекста для избранных товаров
interface FavoriteContextType {
  favoriteProducts: Product[];
  addFavoriteProduct: (product: Product) => void;
  removeFavoriteProduct: (productId: number) => void;
}

// Интерфейс для компонента FavoriteProvider с типом для children
interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favoriteProducts: [],
  addFavoriteProduct: () => {},
  removeFavoriteProduct: () => {},
});

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Загрузка данных из localStorage при первой загрузке
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

  // Сохранение данных в localStorage при изменении favoriteProducts
  useEffect(() => {
    if (favoriteProducts.length > 0) {
      try {
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
      } catch (error) {
        console.error("Error saving favorites to localStorage", error);
      }
    }
  }, [favoriteProducts]);

  // Добавление товара в избранное
  const addFavoriteProduct = (product: Product) => {
    setFavoriteProducts((prev) => {
      if (!prev.some((fav) => fav.id === product.id)) {
        return [...prev, product];
      }
      return prev; // Avoid adding duplicates
    });
  };

  // Удаление товара из избранного
  const removeFavoriteProduct = (productId: number) => {
    setFavoriteProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <FavoriteContext.Provider value={{ favoriteProducts, addFavoriteProduct, removeFavoriteProduct }}>
      {children}
    </FavoriteContext.Provider>
  );
};
