import React from "react";
import { Link } from "react-router-dom";
import { PerfumeProps } from "../../types/perfume";
import { useTranslation } from "react-i18next";

interface IPerfumeCardProps {
  perfume: PerfumeProps;
  sheetname: string;
}

const PerfumeCard: React.FC<IPerfumeCardProps> = ({ perfume, sheetname }) => {
  const { t } = useTranslation();
  const isAvailable = perfume.perfume_isAvailable === 1;

  return (
    <Link
      to={`/perfumes/${sheetname}/${perfume.perfume_id}`}
      className={`relative group flex flex-col items-start justify-between border border-gray-300 rounded-lg p-4 bg-white relative shadow-sm hover:shadow-lg transition-shadow duration-300 active:translate-y-px ${
        !isAvailable ? "opacity-80" : ""
      }`}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={perfume.perfume_url}
            alt={perfume.perfume_name}
            className={`h-[300px] rounded-md mb-4 ${
              !isAvailable ? "filter grayscale" : ""
            }`}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-md"></div>
          )}
        </div>
        <h3 className="w-full text-lg text-left font-semibold">
          {t(`products.${perfume.perfume_name}`, perfume.perfume_name)}
        </h3>
      </div>

      <div className="absolute top-0 left-2 flex flex-col items-start gap-1 mt-2">
        <h2
          className={`py-0.5 px-1.5 rounded-md text-white ${
            isAvailable ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isAvailable ? t("catalog.in_stock") : t("catalog.out_of_stock")}
        </h2>
        {perfume.perfume_type === "original" && (
          <h2 className="bg-yellow-600 py-0.5 px-1.5 rounded-md text-white">
            {perfume.perfume_volume} {t("catalog.ml")}
          </h2>
        )}
      </div>

      <div>
        <p className="text-gray-700">
          <strong>{t("catalog.price")}:</strong> {perfume.perfume_cost} KZT{" "}
          {sheetname === "spilled" && t("catalog.per_ml")}
        </p>
        <div className="relative text-yellow-600 transition-colors">
          {t("catalog.click_to_view")}
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>
      </div>
    </Link>
  );
};

export default PerfumeCard;
