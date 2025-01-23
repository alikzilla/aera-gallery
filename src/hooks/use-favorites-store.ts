import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PerfumeProps {
  id: number;
  name: string;
  cost: number;
  url: string;
  unit?: string;
  description?: string;
  descriptionKz?: string;
  country?: string;
  volume?: string;
  type?: string;
}

interface FavoritesState {
  favorites: PerfumeProps[];
  addToFavorites: (perfume: PerfumeProps) => void;
  removeFromFavorites: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      // Add a perfume to favorites
      addToFavorites: (perfume) => {
        set((state) => {
          // Avoid duplicates
          if (state.favorites.find((item) => item.id === perfume.id)) {
            return state;
          }
          return { favorites: [...state.favorites, perfume] };
        });
      },

      // Remove a perfume from favorites by ID
      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((perfume) => perfume.id !== id),
        }));
      },

      // Clear the entire favorites list
      clearFavorites: () => {
        set(() => ({ favorites: [] }));
      },

      // Check if a perfume is in the favorites list
      isFavorite: (id) => {
        return get().favorites.some((perfume) => perfume.id === id);
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
