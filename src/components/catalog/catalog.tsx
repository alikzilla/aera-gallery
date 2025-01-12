import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Loader } from "../";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

interface Product {
  id: number;
  name: string;
  cost: number;
  url: string;
}

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
      const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/spilled!A1:G?key=${apiKey}`;

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
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных из Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: (document.getElementById("catalog")?.offsetTop || 0) - 60,
      behavior: "smooth",
    });
  }, [currentPage]);

  const getBrandFromName = (name: string) => {
    if (name.startsWith("Al")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("By")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("Ex")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("Jean")) {
      return (
        name.split(" ")[0] + " " + name.split(" ")[1] + " " + name.split(" ")[2]
      );
    }
    if (name.startsWith("Jo")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("Le")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("Tom")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("V")) {
      return name.split(" ")[0] + " " + name.split(" ")[1];
    }
    if (name.startsWith("Yves")) {
      return (
        name.split(" ")[0] + " " + name.split(" ")[1] + " " + name.split(" ")[2]
      );
    }
    return name.split(" ")[0];
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleFavoriteClick = (product: Product) => {
    setFavoriteProducts((prevFavorites) => {
      if (prevFavorites.some((item) => item.name === product.name)) {
        return prevFavorites.filter((item) => item.name !== product.name);
      } else {
        return [...prevFavorites, product];
      }
    });
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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const brands = Array.from(
    new Set(products.map((product) => getBrandFromName(product.name)))
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="mb-5" id="catalog">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={handleSearchChange}
            className=" "
          />
        </div>

        <div className="mb-4">
          <label className="mr-2 font-medium">Выберите бренд:</label>
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
                  {favoriteProducts.some((item) => item.id === product.id) ? (
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
                    <strong>Цена:</strong> {product.cost} KZT за МЛ
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
