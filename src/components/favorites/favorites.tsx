import React, { createContext, useState, useEffect } from "react";
import { Product } from "../../types/product";


interface FavoriteContextProps {
  favoriteProducts: Product[];
  addFavoriteProduct: (product: Product) => void;
  removeFavoriteProduct: (productName: string) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
  favoriteProducts: [],
  addFavoriteProduct: () => {},
  removeFavoriteProduct: () => {},
});

interface FavoriteProviderProps {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteProducts");
    if (savedFavorites) {
      setFavoriteProducts(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const addFavoriteProduct = (product: Product) => {
    setFavoriteProducts((prev) => [...prev, product]);
  };

  const removeFavoriteProduct = (productName: string) => {
    setFavoriteProducts((prev) =>
      prev.filter((product) => product.name !== productName)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteProducts, addFavoriteProduct, removeFavoriteProduct }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
