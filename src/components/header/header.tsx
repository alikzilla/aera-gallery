import Container from "../container/container";
import logo from "../../assets/logoM.png";
import { Link } from "react-router";
import LanguageSelector from "../language-selector/language-selector";

const Header = () => {
  return (
    <header className="py-5">
      <Container>
        <div className="flex items-center justify-between relative">
          <nav className="flex items-center gap-5 flex-1">
            <Link to="/" className="hover:underline">
              Главная
            </Link>
            <Link to="/about" className="hover:underline">
              О нас
            </Link>
            <Link to="/contacts" className="hover:underline">
              Контакты
            </Link>
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to={"/"}>
              <img src={logo} alt="aera-logo" width={100} />
            </Link>
          </div>

          <div className="flex justify-right text-right">
            <LanguageSelector />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
