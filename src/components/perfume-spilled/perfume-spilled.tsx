import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "..";

import { PerfumeProps } from "../../types/product";

import { CheckIcon } from "@heroicons/react/24/outline";
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
  handleMLSelection
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[400px] flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
        Разлив
      </div>

      <div className="w-full md:w-[35%] flex justify-center items-center p-5">
        <img
          src={perfume.url}
          alt={perfume.name}
          className="w-auto h-[400px]"
        />
      </div>

      <div className="w-full md:w-[65%] flex flex-col justify-between p-8 text-gray-700">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {perfume.name}
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
              <strong>{t("product.country")}:</strong> {perfume.country}
            </p>
          </div>
        </div>

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
                  />
                  <span
                    className={`h-6 w-6 border-2 rounded-md flex items-center justify-center transition-all duration-300 ${
                      selectedML === ml ? "bg-yellow-600" : "bg-white"
                    }`}
                  >
                    {selectedML === ml && (
                      <span className="h-5 w-5">
                        <CheckIcon color="white" />
                      </span>
                    )}
                  </span>
                  <span className="tracking-tighter">{ml} МЛ</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5">
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

export default PerfumeSpilled;
