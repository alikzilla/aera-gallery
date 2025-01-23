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

      addToFavorites: (perfume) => {
        set((state) => {
          if (state.favorites.find((item) => item.id === perfume.id)) {
            return state;
          }
          return { favorites: [...state.favorites, perfume] };
        });
      },

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (perfume) => !(perfume.id === id)
          ),
        }));
      },

      clearFavorites: () => {
        set(() => ({ favorites: [] }));
      },

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
