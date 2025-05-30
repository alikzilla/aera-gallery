import React from "react";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../../hooks/use-favorites-store";
import { Button } from "..";
import { PerfumeProps } from "../../types/perfume";

import whatsapp from "../../assets/whatsapp.png";
import {
  ExclamationCircleIcon,
  HeartIcon as OutlineHeartIcon,
} from "@heroicons/react/24/outline";
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

  const isInFavorites = isFavorite(perfume.perfume_id);
  const isAvailable = perfume.perfume_isAvailable === 1;

  const toggleFavorite = () => {
    if (isInFavorites) {
      removeFromFavorites(perfume.perfume_id);
    } else {
      addToFavorites(perfume);
    }
  };

  return (
    <div
      className={`relative min-h-[400px] flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-10 ${
        !isAvailable ? "opacity-90" : ""
      }`}
    >
      <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
        {t("product.full_volume")}
      </div>

      <div className="w-full md:w-[35%] flex justify-center items-center p-5">
        <img
          src={perfume.perfume_url}
          alt={perfume.perfume_name}
          className="w-auto h-[400px]"
        />
      </div>

      <div className="w-full md:w-[65%] flex flex-col justify-between p-8 text-gray-700">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {perfume.perfume_name}
          </h1>

          <div className="flex items-center gap-2">
            <h2 className="bg-yellow-600 p-1 px-2 rounded-md text-md text-white">
              {perfume.perfume_volume} МЛ
            </h2>
            {!isAvailable && (
              <h2 className="bg-red-600 p-1 px-2 rounded-md text-md text-white">
                {t("product.not_available")}
              </h2>
            )}
          </div>

          <p className="text-lg leading-6 text-gray-500 mt-2">{description}</p>
          <div className="space-y-2 mt-2">
            <p>
              <strong>{t("product.country")}:</strong> {perfume.perfume_country}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            {totalPrice} KZT
          </h2>
        </div>

        {isAvailable ? (
          <div className="w-full flex flex-col md:flex-row items-center gap-3 mt-5">
            <Button
              className={`w-full flex items-center justify-center gap-3 ${
                isInFavorites
                  ? "bg-red-700 border-red-600"
                  : "bg-red-600 border-red-400"
              } text-sm md:text-base text-white py-2 hover:bg-red-800 active:translate-y-px`}
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
              className="w-full flex items-center justify-center gap-3 bg-green-600 border-green-400 text-sm md:text-base text-white py-2 hover:bg-green-800 hover:border-green-600 active:translate-y-px"
              onClick={whatsappMessage}
            >
              {t("product.contact_whatsapp")}
              <img src={whatsapp} alt="whatsapp logo" width={24} />
            </Button>
          </div>
        ) : (
          <div className="w-full mt-5 p-3 bg-gray-200 rounded-md text-center">
            <p className="text-gray-700 font-medium">
              {t("product.currently_unavailable")}
            </p>
          </div>
        )}

        <span className="flex items-start gap-2 mt-2">
          <div className="w-5 h-5 flex items-center justify-center pt-2">
            <ExclamationCircleIcon width={20} height={20} />
          </div>
          {t("product.attention")}
        </span>
      </div>
    </div>
  );
};

export default PerfumeOriginal;
