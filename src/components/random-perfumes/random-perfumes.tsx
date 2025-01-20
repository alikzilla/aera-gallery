import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { PerfumeProps } from "../../types/product";

interface IRandomPerfumesProps {
  sheetName: string | undefined;
  otherPerfumes: PerfumeProps[];
}

const RandomPerfumes: React.FC<IRandomPerfumesProps> = ({ sheetName, otherPerfumes }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {t("product.related_perfumes")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {otherPerfumes.map((product: PerfumeProps, index: number) => (
          <Link
            to={`/perfumes/${sheetName}/${product.id}`}
            className="relative group flex flex-col items-start justify-between border border-gray-300 rounded-lg p-4 bg-white relative shadow-sm hover:shadow-lg transition-shadow duration-300"
            key={index}
          >
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={product.url}
                alt={product.name}
                className="h-[200px] rounded-md mb-4"
              />
              <h3 className="w-full text-md text-left font-semibold">
                {product.name}
              </h3>
            </div>

            <div className="absolute top-0 left-2 flex items-center gap-5 mt-2">
              <h2 className="bg-yellow-600 py-1 px-2 text-xs rounded-md text-white">
                {product.volume} МЛ
              </h2>
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-700 text-sm">
                <strong>{t("product.price_label")}:</strong> {product.cost} KZT{" "}
                {sheetName === "spilled" && t("product.per_ml")}
              </p>
              <div className="relative text-xs text-yellow-600 transition-colors">
                {t("product.click_to_view")}
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomPerfumes;
