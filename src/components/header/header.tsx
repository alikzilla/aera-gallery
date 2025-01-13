import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logoM.png";
import { Container, LanguageSelector } from "../";

import { HeartIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
              onClick={() => setIsOpen(!isOpen)}
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
            <nav className="flex items-center justify-center gap-3">
              <Link
                to="/"
                className="relative group hover:text-yellow-600 transition-colors py-2"
              >
                Главная
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative group hover:text-yellow-600 transition-colors py-2"
              >
                О нас
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link
                to="/contacts"
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
            <Link to={"/favourite"}>
              <HeartIcon className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-red-500" />
            </Link>

            <LanguageSelector />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
