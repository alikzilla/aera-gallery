import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Loader, Filters, PerfumeCard, Pagination } from "../";
import { PerfumeProps } from "../../types/perfume";

function Catalog() {
  const [products, setProducts] = useState<PerfumeProps[]>([]);
  const [sheetname, setSheetname] = useState<string>("original");
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [sortOption, setSortOption] = useState<string>("name-asc");

  const { t } = useTranslation();

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setItemsPerPage(8);
    } else if (width <= 1024) {
      setItemsPerPage(12);
    } else {
      setItemsPerPage(20);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
      const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetname}!A1:J?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);
          const formattedProducts: PerfumeProps[] = rows.map(
            (row: string[], index: number) => ({
              perfume_id: index + 1,
              perfume_name: row[0],
              perfume_unit: row[1],
              perfume_cost: parseFloat(row[2]),
              perfume_url: row[3],
              perfume_description: row[4],
              perfume_descriptionKz: row[5],
              perfume_country: row[6],
              perfume_volume: row[7],
              perfume_brand: row[8],
              perfume_isAvailable: Number(row[9]),
              perfume_type: sheetname,
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
  }, [sheetname]);

  console.log(products);

  const getBrandFromName = (name: string) => {
    if (!name) return "";

    const brandPrefix = name.split(" ")[0];
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

  const filteredProducts = products.filter((product) => {
    const name = product.perfume_name || "";
    const matchesBrand = selectedBrand
      ? getBrandFromName(name.toLowerCase()) === selectedBrand.toLowerCase()
      : true;
    const matchesSearchQuery = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearchQuery;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const availabilityA = a.perfume_isAvailable ?? 0;
    const availabilityB = b.perfume_isAvailable ?? 0;

    if (availabilityA !== availabilityB) {
      return availabilityB - availabilityA;
    }

    const nameA = a.perfume_name || "";
    const nameB = b.perfume_name || "";
    const costA = a.perfume_cost || 0;
    const costB = b.perfume_cost || 0;

    switch (sortOption) {
      case "name-asc":
        return nameA.localeCompare(nameB);
      case "name-desc":
        return nameB.localeCompare(nameA);
      case "price-asc":
        return costA - costB;
      case "price-desc":
        return costB - costA;
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
    new Set(products.map((product) => getBrandFromName(product.perfume_name)))
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      setTimeout(() => {
        const catalogElement = document.getElementById("catalog");
        if (catalogElement) {
          const yOffset = -60;
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
        <h1 className="text-3xl font-bold mb-6">{t("catalog.title")}</h1>

        <Filters
          sheetname={sheetname}
          searchQuery={searchQuery}
          brands={brands}
          sortOption={sortOption}
          handleTabChange={handleTabChange}
          handleSearchChange={handleSearchChange}
          handleBrandChange={handleBrandChange}
          handleSortChange={handleSortChange}
        />

        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <PerfumeCard
                perfume={product}
                sheetname={sheetname}
                key={index}
              />
            ))}
          </div>
        ) : (
          <Loader />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </section>
  );
}

export default Catalog;
