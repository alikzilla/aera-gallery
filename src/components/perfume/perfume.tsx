import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  Container,
  Loader,
  RandomPerfumes,
  PerfumeOriginal,
  PerfumeSpilled,
} from "../../components";

import type { PerfumeProps } from "../../types/perfume";

const Perfume = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { id, sheetName } = useParams<{ id: string; sheetName: string }>();
  const [product, setProduct] = useState<PerfumeProps | null>(null);
  const [description, setDescription] = useState<string | undefined>("");
  const [otherPerfumes, setOtherPerfumes] = useState<PerfumeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedML, setSelectedML] = useState<number>(1);

  useEffect(() => {
    const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
    const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:H?key=${apiKey}`;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);

          const perfumes = rows.map((row: string[], index: number) => ({
            id: index + 1,
            name: row[0],
            unit: row[1],
            cost: parseFloat(row[2]),
            url: row[3],
            description: row[4],
            descriptionKz: row[5],
            country: row[6],
            volume: row[7],
          }));

          const foundProduct = perfumes.find(
            (perfume: PerfumeProps) => perfume.id === Number(id)
          );

          if (foundProduct) {
            setProduct(foundProduct);
            setDescription(foundProduct.description);
          }

          const randomPerfumes = perfumes
            .filter((perfume: PerfumeProps) => perfume.id !== Number(id))
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

          setOtherPerfumes(randomPerfumes);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных из Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, sheetName]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  useEffect(() => {
    if (product) {
      currentLanguage === "kz"
        ? setDescription(product.descriptionKz)
        : setDescription(product.description);
    }
  }, [currentLanguage, product]);

  const whatsappMessage = () => {
    const phoneNumber = "77780547007";
    const message = `Здравствуйте! Я заинтересован в товаре: ${
      product?.name
    }, стоимость: ${product?.cost} KZT ${
      !product?.volume ? `за МЛ, выбранное количество: ${selectedML} МЛ.` : ``
    }`;
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
      <section className="h-screen flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600">{t("product.not_found")}</div>
    );
  }

  const totalPrice = product.cost * selectedML;
  const pricePerML = product.cost;

  return (
    <div className="py-[30px]">
      <Container>
        <Breadcrumb name={product.name} />

        {product.volume ? (
          <PerfumeOriginal
            perfume={product}
            description={description}
            totalPrice={totalPrice}
            whatsappMessage={whatsappMessage}
          />
        ) : (
          <PerfumeSpilled
            perfume={product}
            description={description}
            totalPrice={totalPrice}
            pricePerML={pricePerML}
            selectedML={selectedML}
            handleMLSelection={handleMLSelection}
            whatsappMessage={whatsappMessage}
          />
        )}

        <RandomPerfumes sheetName={sheetName} otherPerfumes={otherPerfumes} />
      </Container>
    </div>
  );
};

export default Perfume;
