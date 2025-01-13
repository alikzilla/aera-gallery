import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoM.png";
import { Container, LanguageSelector } from "../";
import { HeartIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";
import { FavoriteContext } from "../favorites/favorites";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showFavoriteWindow, setShowFavoriteWindow] = useState(false);

  const { favoriteProducts } = useContext(FavoriteContext);

  // Calculate the total price of favorite products
  const totalPrice = favoriteProducts.reduce((total, product) => total + product.cost, 0);

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

  return (
    <>
      <header
        className={`w-full fixed z-10 h-[60px] transition-all duration-300 ${
          isScrolled ? "backdrop-blur-lg bg-white bg-opacity-80" : "bg-transparent"
        }`}
      >
        <Container>
          <div className="h-full flex items-center justify-between relative">
            {/* Navbar */}
            <nav className="flex items-center gap-5 md:flex-row md:space-x-6 md:block hidden">
              <Link to="/" className="relative group hover:text-yellow-600 transition-colors">
                Главная
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="relative group hover:text-yellow-600 transition-colors">
                О нас
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link to="/contacts" className="relative group hover:text-yellow-600 transition-colors">
                Контакты
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Hamburger Icon */}
            <div className="md:hidden flex items-center">
              <GiHamburgerMenu
                className="text-black text-3xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            {/* Dropdown Menu for Mobile */}
            <div
              className={`${
                !isOpen ? "translate-x-[-1000px]" : "translate-x-[-16px] sm:translate-x-[-32px]"
              } absolute z-5 top-full w-screen bg-white shadow-lg p-5 md:hidden transition-all duration-300 ease-in-out`}
            >
              <nav className="flex items-center justify-center gap-3">
                <Link to="/" className="relative group hover:text-yellow-600 transition-colors py-2">
                  Главная
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link to="/about" className="relative group hover:text-yellow-600 transition-colors py-2">
                  О нас
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link to="/contacts" className="relative group hover:text-yellow-600 transition-colors py-2">
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
                  onClick={() => setShowFavoriteWindow(!showFavoriteWindow)} // Toggle favorite window
                />
              </div>

              <LanguageSelector />
            </div>
          </div>
        </Container>
      </header>

      {/* Full Page Modal for Favorite Products */}
      {showFavoriteWindow && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center p-6">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold">Ваши избранные товары</h2>
              <button
                onClick={() => setShowFavoriteWindow(false)}
                className="text-xl font-semibold hover:text-yellow-300"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {favoriteProducts.length > 0 ? (
                  favoriteProducts.map((product, index) => (
                    <li key={index} className="flex flex-col space-y-2">
                      <div className="flex items-center gap-3">
                        {/* Показываем изображение товара */}
                        <img
                          src={product.url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <span className="text-lg font-semibold">{product.name}</span>
                          <br />
                          <span className="text-sm text-gray-500">Цена: {product.cost} KZT</span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">У вас нет избранных товаров.</p>
                )}
              </ul>
              <div className="mt-4">
                <p className="text-lg font-semibold">
                  <strong>Общая стоимость:</strong> {totalPrice} KZT
                </p>
              </div>
              <a
                href="https://wa.me/yourwhatsappphone" // Replace with your actual WhatsApp number
                target="_blank"
                className="mt-6 block bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600"
              >
                Связаться через WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
