import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, LanguageSelector } from "../";

import logo from "../../assets/logoM.png";

import { HeartIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFavoriteWindow, setShowFavoriteWindow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const whatsappMessage = (products: Product[]) => {
  //   const phoneNumber = "77780547007";
  //   if (products.length === 0) {
  //     alert(t("header.empty_favorites"));
  //     return;
  //   }
  //   const message = products
  //     .map(
  //       (product, index) =>
  //         `${index + 1}. ${product.name} - ${product.cost} KZT ${
  //           !product.volume ? t("header.per_ml") : ""
  //         }`
  //     )
  //     .join("\n");
  //   const finalMessage = `${t("header.greeting")}:\n${message}`;
  //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  //     finalMessage
  //   )}`;
  //   window.open(whatsappUrl, "_blank");
  // };

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
        className={`w-full fixed z-10 h-[60px] transition-all duration-300 backdrop-blur-lg bg-white bg-opacity-80`}
      >
        <Container>
          <div className="h-full flex items-center justify-between relative">
            {/* Navbar */}
            <nav className="flex items-center gap-5 md:flex-row md:space-x-6 md:block hidden">
              <Link
                to="/"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                {t("header.home")}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                {t("header.about")}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/contacts"
                className="relative group hover:text-yellow-600 transition-colors"
              >
                {t("header.contacts")}
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
                  {t("header.home")}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="relative group hover:text-yellow-600 transition-colors py-2"
                >
                  {t("header.about")}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/contacts"
                  onClick={() => setIsOpen(false)}
                  className="relative group hover:text-yellow-600 transition-colors py-2"
                >
                  {t("header.contacts")}
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
                  onClick={() => handleFavoriteWindowrOpen()}
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
            {t("header.favorite_products")}
          </h2>
          <button
            onClick={() => setShowFavoriteWindow(false)}
            className="text-3xl font-semibold transform-all duration-300 hover:text-yellow-600"
          >
            ×
          </button>
        </div>
        <div className="p-6 w-full h-full flex flex-col justify-between"></div>
      </div>
    </>
  );
};

export default Header;
