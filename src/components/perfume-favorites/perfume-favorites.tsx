import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../../hooks/use-favorites-store";
import { PerfumeProps } from "../../types/perfume";

interface IPerfumeFavoritesProps {
  handleCloseSidebar: (set: boolean) => void;
}

const PerfumeFavorites: React.FC<IPerfumeFavoritesProps> = ({
  handleCloseSidebar,
}) => {
  const { t } = useTranslation();
  const [showFavoriteWindow, setShowFavoriteWindow] = useState(false);
  const { favorites, clearFavorites, removeFromFavorites } =
    useFavoritesStore();

  const handleFavoriteWindowOpen = () => {
    setShowFavoriteWindow(!showFavoriteWindow);
    handleCloseSidebar(false);
  };

  const whatsappMessage = () => {
    const phoneNumber = "77780547007";
    if (favorites.length === 0) {
      alert(t("header.empty_favorites"));
      return;
    }
    const message = favorites
      .map(
        (product: PerfumeProps, index: number) =>
          `${index + 1}. ${product.name} - ${product.cost} KZT ${
            !product.volume ? t("header.per_ml") : ""
          }`
      )
      .join("\n");
    const finalMessage = `${t("header.greeting")}:\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      finalMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="relative">
        <HeartIcon
          className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-red-500"
          onClick={handleFavoriteWindowOpen}
        />
      </div>

      {showFavoriteWindow && (
        <div
          className="fixed inset-0 h-screen bg-black bg-opacity-50 z-[50] overflow-hidden"
          onClick={() => setShowFavoriteWindow(false)}
        ></div>
      )}

      <div
        className={`fixed z-[50] top-0 right-0 w-full max-w-lg h-screen bg-white shadow-md overflow-hidden transition-all duration-300 ${
          showFavoriteWindow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold text-black">
            {t("header.favorite_products")}
          </h2>
          <button
            onClick={() => setShowFavoriteWindow(false)}
            className="text-3xl font-semibold transition-all duration-300 hover:text-yellow-600"
          >
            ×
          </button>
        </div>

        <div className="p-6 w-full h-full flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto">
            {favorites.length > 0 ? (
              favorites.map((perfume: PerfumeProps) => (
                <div
                  key={perfume.id}
                  className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={perfume.url}
                      alt={perfume.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {perfume.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {perfume.cost} KZT
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromFavorites(perfume.id)}
                  >
                    {t("header.remove")}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                {t("header.no_favorites")}
              </p>
            )}
          </div>

          {favorites.length > 0 && (
            <div className="mt-6">
              <button
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-3"
                onClick={whatsappMessage}
              >
                {t("header.contact_whatsapp")}
              </button>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                onClick={clearFavorites}
              >
                {t("header.clear_favorites")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PerfumeFavorites;
