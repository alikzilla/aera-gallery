import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './catalog.css';


interface Product {
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
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]); // Состояние для избранных товаров
  const itemsPerPage = 20; 

  useEffect(() => {
    const fetchProducts = async () => {
      const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
      const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:G?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1); // Пропускаем заголовки таблицы
          const formattedProducts: Product[] = rows.map((row: string[]) => ({
            name: row[0],
            unit: row[1],
            cost: parseFloat(row[2]),
            url: row[3],
            description: row[4],
            descriptionKz: row[5],
            country: row[6],
          }));
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

  const getBrandFromName = (name: string) => {
    return name.split(" ")[0]; // Извлекаем бренд из имени товара
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(1); // Сбрасываем страницу при изменении бренда
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Сбрасываем страницу при изменении запроса
  };

  const handleFavoriteClick = (product: Product) => {
    setFavoriteProducts((prevFavorites) => {
      if (prevFavorites.some((item) => item.name === product.name)) {
        return prevFavorites.filter((item) => item.name !== product.name); // Удалить из избранного
      } else {
        return [...prevFavorites, product]; // Добавить в избранное
      }
    });
  };

  if (loading) {
    return <div></div>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand
      ? getBrandFromName(product.name) === selectedBrand
      : true;
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearchQuery;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const brands = Array.from(new Set(products.map((product) => getBrandFromName(product.name))));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="catalog">
      <h1>Каталог товаров</h1>

      <div>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <label>Выберите бренд: </label>
        <select onChange={handleBrandChange}>
          <option value="">Все бренды</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {currentProducts.map((product, index) => (
          <div className="product-card" key={index}>
            <div
              className="favorite-icon"
              onClick={() => handleFavoriteClick(product)}
            >
              {favoriteProducts.some((item) => item.name === product.name) ? (
                <span>❤️</span> // Сердечко для избранного
              ) : (
                <span>🤍</span> // Пустое сердечко
              )}
            </div>
            <img src={product.url} alt={product.name} />
            <h3>{product.name}</h3>
            <p><strong>Цена:</strong> {product.cost} KZT</p>
            <Link to={`/product/${product.name}`}>Подробнее</Link> {/* Ссылка на страницу товара */}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Следующая
        </button>
      </div>
    </div>
  );
};

export default Catalog;