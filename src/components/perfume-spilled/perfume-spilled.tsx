import React from "react";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../../hooks/use-favorites-store";
import { Button } from "..";
import { PerfumeProps } from "../../types/perfume";

import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import whatsapp from "../../assets/whatsapp.png";

interface IPerfumeOriginalProps {
  perfume: PerfumeProps;
  description: string | undefined;
  totalPrice: number;
  selectedML: number;
  pricePerML: number;
  whatsappMessage: () => void;
  handleMLSelection: (ml: number) => void;
}

const PerfumeSpilled: React.FC<IPerfumeOriginalProps> = ({
  perfume,
  description,
  totalPrice,
  selectedML,
  pricePerML,
  whatsappMessage,
  handleMLSelection,
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
      addToFavorites({
        ...perfume,
        perfume_cost: totalPrice,
        perfume_volume: selectedML.toString(),
      });
    }
  };

  return (
    <div
      className={`relative min-h-[400px] flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-10 ${
        !isAvailable ? "opacity-90" : ""
      }`}
    >
      <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
        Разлив
      </div>

      {!isAvailable && (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md z-10">
          {t("product.not_available")}
        </div>
      )}

      <div className="w-full md:w-[35%] flex justify-center items-center p-5">
        <img
          src={perfume.perfume_url}
          alt={perfume.perfume_name}
          className={`w-auto h-[400px] ${
            !isAvailable ? "filter grayscale" : ""
          }`}
        />
      </div>

      <div className="w-full md:w-[65%] flex flex-col justify-between p-8 text-gray-700">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {perfume.perfume_name}
          </h1>

          <h2 className="text-2xl font-semibold text-gray-900">
            {totalPrice} KZT {t("product.per_ml_for", { ml: selectedML })}
            <p className="text-sm text-gray-500">
              {t("product.price_per_ml")}: {pricePerML} KZT
            </p>
          </h2>

          <p className="text-lg leading-6 text-gray-500">{description}</p>
          <div className="space-y-2">
            <p>
              <strong>{t("product.country")}:</strong> {perfume.perfume_country}
            </p>
            {!isAvailable && (
              <p className="text-red-600 font-medium">
                {t("product.currently_unavailable")}
              </p>
            )}
          </div>
        </div>

        {isAvailable ? (
          <>
            <div className="space-y-4 mt-4">
              <div>
                <strong>{t("product.select_quantity")}:</strong>
                <div className="flex gap-4 mt-2">
                  {[1, 10, 15, 20, 30].map((ml) => (
                    <label
                      key={ml}
                      className="flex flex-wrap items-center gap-2 cursor-pointer group relative"
                    >
                      <input
                        type="checkbox"
                        checked={selectedML === ml}
                        onChange={() => handleMLSelection(ml)}
                        className="peer hidden"
                        disabled={!isAvailable}
                      />
                      <span
                        className={`h-6 w-6 border-2 rounded-md flex items-center justify-center transition-all duration-300 ${
                          selectedML === ml ? "bg-yellow-600" : "bg-white"
                        } ${
                          !isAvailable ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {selectedML === ml && (
                          <span className="h-5 w-5">
                            <CheckIcon color="white" />
                          </span>
                        )}
                      </span>
                      <span
                        className={`tracking-tighter ${
                          !isAvailable ? "opacity-50" : ""
                        }`}
                      >
                        {ml} МЛ
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
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
          </>
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

export default PerfumeSpilled;
