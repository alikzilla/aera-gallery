import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Loader } from "../";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/product";
import { FavoriteContext } from "../favorites/favorites";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sheetname, setSheetname] = useState<string>("original");
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("name-asc");

  const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct } =
    useContext(FavoriteContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
      const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetname}!A1:G?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);
          const formattedProducts: Product[] = rows.map(
            (row: string[], index: number) => ({
              id: index + 1,
              name: row[0],
              unit: row[1],
              cost: parseFloat(row[2]),
              url: row[3],
              description: row[4],
              descriptionKz: row[5],
              country: row[6],
            })
          );
          setProducts(formattedProducts);
          console.log("dasdsada");
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных из Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sheetname]);

  const getBrandFromName = (name: string) => {
    const brandPrefix = name.split(" ")[0];
    // Brand extraction logic remains unchanged
    switch (brandPrefix) {
      case "Al":
      case "By":
      case "Ex":
      case "Jo":
      case "Le":
      case "Tom":
      case "V":
      case "Van":
      case "Terre":
      case "Tiziana":
      case "Mark":
      case "Attar":
      case "Mont":
      case "Nina":
      case "Orto":
      case "Paco":
      case "Thomas":
      case "Vilhelm":
      case "Victoria's":
      case "CLIVE":
      case "Armani":
        return name.split(" ")[0] + " " + name.split(" ")[1];

      case "Jean":
      case "Yves":
      case "Viktor":
      case "Acqua":
        return name.split(" ").slice(0, 3).join(" ");

      case "Juliette":
      case "Armaf":
        return name.split(" ").slice(0, 4).join(" ");

      default:
        return name.split(" ")[0];
    }
  };

  const handleTabChange = (tab: string) => {
    setSheetname(tab);
    setCurrentPage(1);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleFavoriteClick = (product: Product) => {
    if (favoriteProducts.some((fav) => fav.id === product.id)) {
      removeFavoriteProduct(product.id);
    } else {
      addFavoriteProduct(product);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand
      ? getBrandFromName(product.name) === selectedBrand
      : true;
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (selectedBrand === "Все бренды") {
      return products && matchesSearchQuery;
    }

    return matchesBrand && matchesSearchQuery;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.cost - b.cost;
      case "price-desc":
        return b.cost - a.cost;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const brands = Array.from(
    new Set(products.map((product) => getBrandFromName(product.name)))
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      setTimeout(() => {
        const catalogElement = document.getElementById("catalog");
        if (catalogElement) {
          const yOffset = -60; // Offset by 60px upwards
          const yPosition =
            catalogElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({
            top: yPosition,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  return (
    <section className="mb-5 pt-9" id="catalog">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>
        {/* Tabs for switching between sheets */}
        <div className="mb-4 flex justify-center relative">
          {/* Highlight bar for active tab */}
          <div
            className={`absolute bottom-0 h-[4px] bg-yellow-600 transition-all duration-300`}
            style={{
              width: "50%",
              transform:
                sheetname === "original"
                  ? "translateX(-50%)"
                  : "translateX(50%)",
            }}
          ></div>

          <button
            className={`w-full p-3 border border-t border-l rounded-l-lg ${
              sheetname === "original" ? "text-black" : "bg-white"
            } transition-colors duration-300`}
            onClick={() => handleTabChange("original")}
          >
            Полный объем
          </button>
          <button
            className={`w-full p-3 border border-t border-r rounded-r-lg ${
              sheetname === "spilled" ? "text-black" : "bg-white"
            } transition-colors duration-300`}
            onClick={() => handleTabChange("spilled")}
          >
            Разливные
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Search and Brand Filter */}
          <div className="flex gap-4 items-center">
            <div>
              <label className="mr-2 font-medium text-gray-700">Бренд:</label>
              <select
                onChange={handleBrandChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option>Все бренды</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Сортировать:</label>
            <select
              onChange={handleSortChange}
              value={sortOption}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="name-asc">Название (A-Z)</option>
              <option value="name-desc">Название (Z-A)</option>
              <option value="price-asc">Цена (по возрастанию)</option>
              <option value="price-desc">Цена (по убыванию)</option>
            </select>
          </div>
        </div>

        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <div
                className="flex flex-col items-start justify-between border border-gray-300 rounded-lg p-4 bg-white relative shadow-sm hover:shadow-lg transition-shadow duration-300"
                key={index}
              >
                <div
                  className="absolute top-3 right-3 cursor-pointer text-2xl"
                  onClick={() => handleFavoriteClick(product)}
                >
                  {favoriteProducts.some((fav) => fav.id === product.id) ? (
                    <SolidHeartIcon className="h-7 w-7 cursor-pointer text-red-500 transition-all duration-300" />
                  ) : (
                    <OutlineHeartIcon className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-red-500" />
                  )}
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="h-[300px] rounded-md mb-4"
                  />
                  <h3 className="w-full text-lg text-left font-semibold">
                    {product.name}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-700">
                    <strong>Цена:</strong> {product.cost} KZT {sheetname === "spilled" && "за МЛ"}
                  </p>
                  <Link
                    to={`/perfumes/${product.name}`}
                    className="relative group hover:text-yellow-600 transition-colors"
                  >
                    Подробнее
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}

        <div className="pagination flex justify-center items-center gap-4 mt-6">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Предыдущая
          </Button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Следующая
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Catalog;
