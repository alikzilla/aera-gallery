import { useState, useEffect } from "react";
import Container from "../container/container";
import logo from "../../assets/logoM.png";
import { Link } from "react-router-dom";
import LanguageSelector from "../language-selector/language-selector";
import React from "react";
import { VscHeart } from "react-icons/vsc";
import { HeartIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <nav className="flex items-center gap-5">
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

          <div className="absolute left-1/2 transform -translate-x-1/2">
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
