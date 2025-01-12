import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './product-page.css';

interface Product {
  name: string;
  unit: string;
  cost: number;
  url: string;
  description: string;
  country: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id из URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const sheetId = "1qD8BK7B51Ye-UzCbEFE5QCQrgE5od6dyniFDtUwXJiw";
    const apiKey = "AIzaSyAeeWYFcj-knuSe2xTNT5UYyLWyzr4hVKI";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:G?key=${apiKey}`;

    const fetchProduct = async () => {
      const response = await fetch(url);
      const data = await response.json();

      if (data.values) {
        const rows = data.values.slice(1); // Пропускаем заголовки таблицы
        const foundProduct = rows.find((row: string[]) => row[0] === id); // Ищем товар по id
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
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">Назад к каталогу</Link>
      <div className="product">
        <div className="images">
          <img src={product.url} alt={product.name} />
        </div>
        <div className="details">
          <h1>{product.name}</h1>
          <h2>{product.cost} KZT</h2>
          <p className="desc">{product.description}</p>
          <p><strong>Единица:</strong> {product.unit}</p>
          <p><strong>Страна:</strong> {product.country}</p>
          <div className="buttons">
            <button className="add">хэй вацап</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
