import React from "react";
import { Link } from "react-router-dom";
import { PerfumeProps } from "../../types/product";
import { useTranslation } from "react-i18next";

interface IPerfumeCardProps {
  perfume: PerfumeProps;
  sheetname: string;
}

const PerfumeCard: React.FC<IPerfumeCardProps> = ({ perfume, sheetname }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/perfumes/${sheetname}/${perfume.id}`}
      className="relative group flex flex-col items-start justify-between border border-gray-300 rounded-lg p-4 bg-white relative shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={perfume.url}
          alt={perfume.name}
          className="h-[300px] rounded-md mb-4"
        />
        <h3 className="w-full text-lg text-left font-semibold">
          {t(`products.${perfume.name}`, perfume.name)}{" "}
          {/* Translates product names */}
        </h3>
      </div>

      <div className="absolute top-0 left-2 flex items-center gap-5 mt-2">
        <h2 className="bg-yellow-600 py-1 px-2 rounded-md text-white">
          {perfume.volume} {t("catalog.ml")}
        </h2>
      </div>

      <div>
        <p className="text-gray-700">
          <strong>{t("catalog.price")}:</strong> {perfume.cost} KZT{" "}
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
