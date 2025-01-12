import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Loader } from "../../components";
import whatsapp from "../../assets/WhatsApp.svg.webp";

interface Product {
  name: string;
  unit: string;
  cost: number;
  url: string;
  description: string;
  country: string;
}

const PerfumePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
    const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/spilled!A1:G?key=${apiKey}`;

    const fetchProduct = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);
          const foundProduct = rows.find((row: string[]) => row[0] === id);
          if (foundProduct) {
            setProduct({
              name: foundProduct[0],
              unit: foundProduct[1],
              cost: parseFloat(foundProduct[2]),
              url: foundProduct[3],
              description: foundProduct[4],
              country: foundProduct[6],
            });
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных из Google Sheets:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: (document.getElementById("catalog")?.offsetTop || 0) - 60,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <section className="h-[500px] flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const whatsappMessage = () => {
    const phoneNumber = "87780547007";
    const message = `Здравствуйте! Я заинтересован в товаре: ${product.name}, стоимость: ${product.cost} KZT`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-[30px]">
      <Container>
        <Link
          to={"/"}
          className="relative group hover:text-yellow-600 transition-colors mb-5 inline-block text-lg font-semibold text-gray-600"
        >
          Назад к каталогу
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </Link>

        <div className="min-h-[380px] flex items-center justify-between bg-white rounded-xl shadow-lg overflow-hidden mb-[30px]">
          <div className="w-[35%] flex-1 max-w-[450px] min-w-[300px] flex justify-center items-center p-5">
            <img
              src={product.url}
              alt={product.name}
              className="w-auto h-[300px] rounded-lg"
            />
          </div>

          <div className="w-[65%] h-full flex flex-col flex-2 justify-between p-8 text-gray-700">
            <div className="h-full flex flex-col items-start justify-start">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2 capitalize">
                {product.name}
              </h1>
              <h2 className="text-xl font-medium text-gray-600 mb-5">
                {product.cost} KZT за МЛ
              </h2>
              <p className="text-base leading-6 text-gray-500 mb-5">
                {product.description}
              </p>
              <p className="text-base mb-3 text-gray-700">
                <strong>Единица:</strong> {product.unit}
              </p>
              <p className="text-base mb-3 text-gray-700">
                <strong>Страна:</strong> {product.country}
              </p>
            </div>

            <Button
              className="w-[250px] flex items-center justify-center gap-3 hover:bg-green-700 hover:border-green-400"
              onClick={whatsappMessage}
            >
              Связаться в WhatsApp
              <img src={whatsapp} alt="whatsapp logo" width={30} />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PerfumePage;
