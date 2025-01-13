import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Loader } from "../../components";
import whatsapp from "../../assets/WhatsApp.svg.webp";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FavoriteContext } from "../../components/favorites/favorites";
import { Product } from "../../types/product";

const PerfumePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [otherPerfumes, setOtherPerfumes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedML, setSelectedML] = useState<number>(1); // State for selected ML quantity

  const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct } =
    useContext(FavoriteContext);

  useEffect(() => {
    const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
    const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/spilled!A1:G?key=${apiKey}`;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);
          const foundProduct = rows.find((row: string[]) => row[0] === id);

          if (foundProduct) {
            setProduct({
              id: foundProduct[0],
              name: foundProduct[0],
              unit: foundProduct[1],
              cost: parseFloat(foundProduct[2]),
              url: foundProduct[3],
              description: foundProduct[4],
              country: foundProduct[6],
            });
          }

          const randomPerfumes = rows
            .filter((row: string[]) => row[0] !== id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map((row: string[]) => ({
              name: row[0],
              unit: row[1],
              cost: parseFloat(row[2]),
              url: row[3],
              description: row[4],
              country: row[6],
            }));

          setOtherPerfumes(randomPerfumes);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных из Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Scroll to top when the component is mounted
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const handleFavoriteClick = (product: Product) => {
    if (favoriteProducts.some((fav) => fav.id === product.id)) {
      removeFavoriteProduct(product.id);
    } else {
      addFavoriteProduct(product);
    }
  };

  const whatsappMessage = () => {
    const phoneNumber = "87780547007";
    const message = `Здравствуйте! Я заинтересован в товаре: ${product?.name}, стоимость: ${product?.cost} KZT за МЛ, выбранное количество: ${selectedML} МЛ.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMLSelection = (ml: number) => {
    setSelectedML(ml);
  };

  if (loading) {
    return (
      <section className="h-[500px] flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  if (!product) {
    return <div className="text-center text-gray-600">Товар не найден</div>;
  }

  const totalPrice = product.cost * selectedML;
  const pricePerML = product.cost; // Price for 1 ML

  return (
    <div className="py-[30px]">
      <Container>
        {/* Навигация */}
        <nav className="mb-5 text-gray-500 text-sm">
          <Link to="/" className="hover:text-yellow-600">
            Главная
          </Link>{" "}
          /<span className="text-gray-700"> {product.name}</span>
        </nav>

        {/* Карточка товара */}
        <div className="relative min-h-[400px] flex flex-col md:flex-row items-start justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          {/* Бейдж */}
          <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
            Разлив
          </div>

          <div className="w-full md:w-[35%] flex justify-center items-center p-5">
            <img
              src={product.url}
              alt={product.name}
              className="w-auto h-[400px]"
            />
          </div>

          <div className="w-full md:w-[65%] flex flex-col justify-between p-8 text-gray-700">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {product.name}
              </h1>

              <h2 className="text-2xl font-semibold text-gray-900">
                {totalPrice} KZT за {selectedML} МЛ
                <p className="text-sm text-gray-500">
                  Цена за 1 МЛ: {pricePerML} KZT
                </p>
              </h2>

              <p className="text-lg leading-6 text-gray-500">
                {product.description}
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Страна:</strong> {product.country}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <strong>Выберите количество (МЛ):</strong>
                <div className="flex gap-4 mt-2">
                  {[1, 3, 5, 10].map((ml) => (
                    <label
                      key={ml}
                      className="flex items-center gap-2 cursor-pointer group relative"
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
                            <CheckIcon color="white"/>
                          </span>
                        )}
                      </span>
                      {ml} МЛ
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <Button
                className="w-full md:w-[250px] flex items-center justify-center gap-3 bg-green-600 text-white py-2 hover:bg-green-700"
                onClick={whatsappMessage}
              >
                Связаться в WhatsApp
                <img src={whatsapp} alt="whatsapp logo" width={24} />
              </Button>
              <div
                className="absolute top-7 right-7 cursor-pointer text-2xl"
                onClick={() => handleFavoriteClick(product)}
              >
                {favoriteProducts.some((fav) => fav.id === product.id) ? (
                  <SolidHeartIcon className="h-[40px] w-[40px] cursor-pointer text-red-500 transition-all duration-300" />
                ) : (
                  <OutlineHeartIcon className="h-[40px] w-[40px] font-bold cursor-pointer text-black transition-all duration-300 hover:text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендуемые парфюмы */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Посмотрите также эти парфюмы
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {otherPerfumes.map((product, index) => (
              <div
                className="flex flex-col items-start justify-between border border-gray-300 rounded-lg p-4 bg-white relative shadow-sm hover:shadow-lg transition-shadow duration-300"
                key={index}
              >
                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="h-[200px] rounded-md mb-4"
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
        </div>
      </Container>
    </div>
  );
};

export default PerfumePage;
