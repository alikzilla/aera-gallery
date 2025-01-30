import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PerfumeProps } from "../types/perfume";

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
          if (state.favorites.find((item) => item.perfume_id === perfume.perfume_id)) {
            return state;
          }
          return { favorites: [...state.favorites, perfume] };
        });
      },

      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (perfume) => !(perfume.perfume_id === id)
          ),
        }));
      },

      clearFavorites: () => {
        set(() => ({ favorites: [] }));
      },

      isFavorite: (id) => {
        return get().favorites.some((perfume) => perfume.perfume_id === id);
      },     
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
