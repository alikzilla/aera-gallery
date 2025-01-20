import React from "react";
import { useTranslation } from "react-i18next";

interface IFiltersProps {
  sheetname: string;
  searchQuery: string;
  brands: string[];
  sortOption: string;
  handleTabChange: (tab: string) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrandChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters: React.FC<IFiltersProps> = ({
  sheetname,
  searchQuery,
  brands,
  sortOption,
  handleTabChange,
  handleSearchChange,
  handleBrandChange,
  handleSortChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4 flex justify-center relative">
        <div
          className={`absolute bottom-0 h-[4px] bg-yellow-600 transition-all duration-300`}
          style={{
            width: "50%",
            transform:
              sheetname === "original" ? "translateX(-50%)" : "translateX(50%)",
          }}
        ></div>
        <button
          className={`w-full p-3 border border-gray-300 border-t border-l rounded-l-lg rounded-b-none ${
            sheetname === "original" ? "text-black" : "bg-white"
          } transition-colors duration-300`}
          onClick={() => handleTabChange("original")}
        >
          {t("tabs.fullVolume")}
        </button>
        <button
          className={`w-full p-3 border border-gray-300 border-t border-r rounded-r-lg rounded-b-none ${
            sheetname === "spilled" ? "text-black" : "bg-white"
          } transition-colors duration-300`}
          onClick={() => handleTabChange("spilled")}
        >
          {t("tabs.spilled")}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t("catalog.searchPlaceholder")}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-t-none rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          <label className="font-medium text-gray-700">Бренд:</label>
          <select
            onChange={handleBrandChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option>{t("catalog.allBrands")}</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">
            {t("catalog.sort")}
          </label>
          <select
            onChange={handleSortChange}
            value={sortOption}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="name-asc">{t("catalog.sortOptions.nameAsc")}</option>
            <option value="name-desc">
              {t("catalog.sortOptions.nameDesc")}
            </option>
            <option value="price-asc">
              {t("catalog.sortOptions.priceAsc")}
            </option>
            <option value="price-desc">
              {t("catalog.sortOptions.priceDesc")}
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Filters;
