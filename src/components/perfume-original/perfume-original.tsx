import React from "react";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../../hooks/use-favorites-store";
import { Button } from "..";
import { PerfumeProps } from "../../types/perfume";

import whatsapp from "../../assets/whatsapp.png";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

interface IPerfumeOriginalProps {
  perfume: PerfumeProps;
  description: string | undefined;
  totalPrice: number;
  whatsappMessage: () => void;
}

const PerfumeOriginal: React.FC<IPerfumeOriginalProps> = ({
  perfume,
  description,
  totalPrice,
  whatsappMessage,
}) => {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  const isInFavorites = isFavorite(perfume.id);

  const toggleFavorite = () => {
    if (isInFavorites) {
      removeFromFavorites(perfume.id);
    } else {
      addToFavorites(perfume);
    }
  };

  return (
    <div className="relative min-h-[400px] flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
        {t("product.full_volume")}
      </div>

      <div className="w-full md:w-[35%] flex justify-center items-center p-5">
        <img
          src={perfume.url}
          alt={perfume.name}
          className="w-auto h-[400px]"
        />
      </div>

      <div className="w-full md:w-[65%] flex flex-col justify-between p-8 text-gray-700">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {perfume.name}
          </h1>

          <div className="flex items-center gap-5">
            <h2 className="bg-yellow-600 p-1 rounded-md text-md text-white">
              {perfume.volume} МЛ
            </h2>
          </div>

          <p className="text-lg leading-6 text-gray-500 mt-2">{description}</p>
          <div className="space-y-2 mt-2">
            <p>
              <strong>{t("product.country")}:</strong> {perfume.country}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            {totalPrice} KZT
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Button
            className={`w-full md:w-auto flex items-center justify-center gap-3 ${
              isInFavorites
                ? "bg-red-700 border-red-600"
                : "bg-red-600 border-red-400"
            } text-sm md:text-base text-white py-2 hover:bg-red-800`}
            onClick={toggleFavorite}
          >
            {isInFavorites
              ? t("product.remove_from_favorites")
              : t("product.add_to_favorites")}
            {isInFavorites ? (
              <SolidHeartIcon className="h-6 w-6" />
            ) : (
              <OutlineHeartIcon className="h-6 w-6" />
            )}
          </Button>

          <Button
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-600 border-green-400 text-sm md:text-base text-white py-2 hover:bg-green-700"
            onClick={whatsappMessage}
          >
            {t("product.contact_whatsapp")}
            <img src={whatsapp} alt="whatsapp logo" width={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerfumeOriginal;
