import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoM.png";
import whatsapp from "../../assets/WhatsApp.svg.webp";
import { Container, LanguageSelector, Button } from "../";
import { HeartIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";
import { FavoriteContext } from "../favorites/favorites";
import { Product } from "../../types/product";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showFavoriteWindow, setShowFavoriteWindow] = useState(false);

  const { favoriteProducts, clearFavorites } = useContext(FavoriteContext);

  const totalPrice = favoriteProducts.reduce(
    (total, product) => total + product.cost,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 
  
  const whatsappMessage = (products: Product[]) => {
    const phoneNumber = "77780547007";
    if (products.length === 0) {
      alert("Ваш список избранных товаров пуст.");
      return;
    }

    const message = products
      .map(
        (product, index) =>
          `${index + 1}. ${product.name} - ${product.cost} KZT ${
            !product.volume ? "за МЛ" : ""
          }`
      )
      .join("\n");

    const finalMessage = `Здравствуйте! Я заинтересован в следующих товарах:\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      finalMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleGamburgerOpen = () => {
    setIsOpen(!isOpen);
    setShowFavoriteWindow(false);
  };

  const handleFavoriteWindowrOpen = () => {
    setIsOpen(false);
    setShowFavoriteWindow(!showFavoriteWindow);
  };

  return (
    <>
      <header
        className={`w-full fixed z-10 h-[60px] transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-lg bg-white bg-opacity-80"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="h-full flex items-center justify-between relative">
            {/* Navbar */}
            <nav className="flex items-center gap-5 md:flex-row md:space-x-6 md:block hidden">
              <Link
                to="/"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                Главная
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                О нас
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/contacts"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                Контакты
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Hamburger Icon */}
            <div className="md:hidden flex items-center">
              <GiHamburgerMenu
                className="text-black text-3xl cursor-pointer"
                onClick={() => handleGamburgerOpen()}
              />
            </div>

            {/* Dropdown Menu for Mobile */}
            <div
              className={`${
                !isOpen
                  ? "translate-x-[-1000px]"
                  : "translate-x-[-16px] sm:translate-x-[-32px]"
              } absolute z-5 top-full w-screen bg-white shadow-lg p-5 md:hidden transition-all duration-300 ease-in-out`}
            >
              <nav className="relative flex flex-col items-center justify-center gap-3">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="relative group hover:text-yellow-600 transition-colors py-2"
                >
                  Главная
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="relative group hover:text-yellow-600 transition-colors py-2"
                >
                  О нас
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/contacts"
                  onClick={() => setIsOpen(false)}
                  className="relative group hover:text-yellow-600 transition-colors py-2"
                >
                  Контакты
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </nav>
            </div>

            <div className="absolute z-10 left-1/2 transform -translate-x-1/2">
              <Link to={"/"}>
                <img src={logo} alt="aera-logo" width={100} />
              </Link>
            </div>

            <div className="flex justify-right text-right gap-4">
              <div className="relative">
                <HeartIcon
                  className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-red-500"
                  onClick={() => handleFavoriteWindowrOpen()} // Toggle favorite window
                />
              </div>

              <LanguageSelector />
            </div>
          </div>
        </Container>
      </header>

      {showFavoriteWindow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-hidden"
          onClick={() => setShowFavoriteWindow(false)}
        ></div>
      )}

      <div
        className={`fixed z-[50] right-0 w-full max-w-lg h-screen bg-white shadow-md overflow-hidden transition-all duration-300 ${
          showFavoriteWindow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold text-block">
            Ваши избранные товары
          </h2>
          <button
            onClick={() => setShowFavoriteWindow(false)}
            className="text-3xl font-semibold transform-all duration-300 hover:text-yellow-600"
          >
            ×
          </button>
        </div>
        <div className="p-6 w-full h-full flex flex-col justify-between">
          <ul className="space-y-3">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product, index) => (
                <li key={index} className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-auto h-16 object-fit rounded-md"
                    />
                    <div>
                      <Link
                        to={`/perfumes/${
                          product.volume ? "original" : "spilled"
                        }/${product.name}`}
                        onClick={() => setShowFavoriteWindow(false)}
                        className="font-bold relative group hover:text-yellow-600 transition-colors py-2"
                      >
                        {product.name}
                        <span className="absolute left-0 bottom-1.5 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                      </Link>
                      <br />
                      <span className="text-sm text-gray-500">
                        Цена: {product.cost} KZT {!product.volume && "за МЛ"}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                У вас нет избранных товаров.
              </p>
            )}
          </ul>
          <div className="flex flex-col mb-20">
            <div className="mt-4">
              <p className="text-lg">
                <strong>Общая стоимость:</strong> {totalPrice} KZT
              </p>
            </div>
            <Button
              className="mt-3 w-full flex items-center justify-center gap-3 hover:bg-green-700 hover:border-green-400"
              onClick={() => whatsappMessage(favoriteProducts)}
            >
              Связаться в WhatsApp
              <img src={whatsapp} alt="whatsapp logo" width={30} />
            </Button>
            <Button
              onClick={clearFavorites}
              className="mt-3 w-full flex items-center justify-center gap-3 hover:bg-red-700 hover:border-red-400"
            >
              Очистить избранное
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
