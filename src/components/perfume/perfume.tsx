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
  const [product, setProduct] = useState<PerfumeProps>();
  const [description, setDescription] = useState<string | undefined>("");
  const [otherPerfumes, setOtherPerfumes] = useState<PerfumeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedML, setSelectedML] = useState<number>(1);

  useEffect(() => {
    const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
    const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:J?key=${apiKey}`;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
          const rows = data.values.slice(1);

          const perfumes = rows.map((row: string[], index: number) => ({
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
            perfume_type: sheetName,
          }));

          const foundProduct = perfumes.find(
            (perfume: PerfumeProps) => perfume.perfume_id === Number(id)
          );

          if (foundProduct) {
            setProduct(foundProduct);
            setDescription(foundProduct.description);
          }

          const randomPerfumes = perfumes
            .filter(
              (perfume: PerfumeProps) => perfume.perfume_id !== Number(id)
            )
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
        ? setDescription(product.perfume_descriptionKz)
        : setDescription(product.perfume_description);
    }
  }, [currentLanguage, product]);

  const whatsappMessage = () => {
    const phoneNumber = "77760547007";
    const message = `Здравствуйте! Я заинтересован в товаре: ${
      product?.perfume_name
    }, стоимость: ${product?.perfume_cost} KZT ${
      !product?.perfume_volume
        ? `за МЛ, выбранное количество: ${selectedML} МЛ.`
        : ``
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

  const totalPrice = product.perfume_cost * selectedML;
  const pricePerML = product.perfume_cost;

  return (
    <div className="py-[30px]">
      <Container>
        <Breadcrumb name={product.perfume_name} />

        {product.perfume_type === "original" ? (
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
