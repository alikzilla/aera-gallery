import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../../hooks/use-favorites-store";

import { Button, OrderModal } from "..";

import {
  HeartIcon,
  ArchiveBoxXMarkIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import whatsapp from "../../assets/whatsapp.png";

import { PerfumeProps } from "../../types/perfume";

interface IPerfumeFavoritesProps {
  handleCloseSidebar: (set: boolean) => void;
}

const PerfumeFavorites: React.FC<IPerfumeFavoritesProps> = ({
  handleCloseSidebar,
}) => {
  const { t } = useTranslation();
  const [showFavoriteWindow, setShowFavoriteWindow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const totalCost = favorites.reduce((acc, fav) => acc + fav.cost, 0);

  return (
    <>
      <div className="relative">
        <HeartIcon
          className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-red-500 active:translate-y-px"
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
        className={`fixed z-[50] top-0 bottom-0 right-0 w-full max-w-lg h-screen bg-white shadow-md overflow-hidden transition-all duration-300 ${
          showFavoriteWindow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-[10%] flex justify-between items-center p-4">
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

        <div className="p-6 w-full h-[90%] flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto">
            {favorites.length > 0 ? (
              favorites.map((perfume: PerfumeProps) => (
                <div
                  key={perfume.id}
                  className="flex justify-between items-center gap-10 p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={perfume.url}
                      alt={perfume.name}
                      className="w-12 h-auto rounded-lg object-cover"
                    />
                    <div className="flex flex-col items-start">
                      <div className="relative text-left">
                        <Link
                          to={`/perfumes/${perfume.type}/${perfume.id}`}
                          onClick={() => setShowFavoriteWindow(false)}
                          className="inline-block font-semibold text-gray-800 transformation-all duration-200 hover:text-yellow-700 active:text-yellow-600"
                        >
                          {perfume.name}
                        </Link>
                      </div>

                      <p className="text-sm text-gray-600">
                        {perfume.cost} KZT - {perfume.volume} МЛ
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
            <div className="flex flex-col items-center gap-3">
              <div className="w-full flex items-center gap-3">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 text-xs md:text-sm py-2 active:translate-y-px"
                >
                  <span className="flex items-center gap-1">
                    {t("header.buy", { total_cost: totalCost })}
                    <CreditCardIcon className="h-6 w-6" />
                  </span>
                </Button>

                <Button
                  className="w-full flex items-center justify-center gap-3 bg-green-600 border-green-400 text-xs md:text-sm text-white py-2 hover:bg-green-800 hover:border-green-600 active:translate-y-px"
                  onClick={whatsappMessage}
                >
                  <span className="flex items-center gap-1">
                    {t("header.contact_via_whatsapp")}
                    <img src={whatsapp} alt="whatsapp logo" width={24} />
                  </span>
                </Button>
              </div>

              <Button
                className="w-full flex items-center justify-center gap-3 bg-red-600 border-red-400 text-sm md:text-base text-white py-2 hover:bg-red-800 hover:border-red-600 active:translate-y-px"
                onClick={clearFavorites}
              >
                <span className="flex items-center gap-1">
                  {t("header.clear_favorites")}
                  <ArchiveBoxXMarkIcon className="h-6 w-6" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <OrderModal
        perfumes={favorites}
        isOpen={isModalOpen}
        total_price={totalCost}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PerfumeFavorites;
