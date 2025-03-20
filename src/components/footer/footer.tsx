import Container from "../container/container";
import logo from "../../assets/logoM-white.png";
import instagramLogo from "../../assets/instagram.png";
import whatsappLogo from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Logo and Rights Section */}
          <div className="flex flex-col items-start gap-2">
            <Link to="/">
              <img src={logo} alt="Company Logo" width={100} />
            </Link>

            {/* Legal Links */}
            <nav className="flex flex-col items-start gap-1">
              <Link
                to="https://docs.google.com/document/d/1TmTOxxHvm9vey9fC7Iukyw4_Khto2-Lz/edit?usp=sharing&ouid=108208564282402305610&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Пользовательское соглашение
              </Link>
              <Link
                to="https://docs.google.com/document/d/1086-r7DY4714zpLSHCAADbryt1gsBgGx/edit?usp=sharing&ouid=108208564282402305610&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Обработка персональных данных
              </Link>
              <Link
                to="https://docs.google.com/document/d/1jDJES5B-FZfM2qOo92j-FxipE7O4205f/edit?usp=sharing&ouid=108208564282402305610&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Конфиденциальность и защита информации
              </Link>
            </nav>

            <p className="text-white">© Все права защищены</p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Social Media Links */}
            <nav className="flex items-center gap-3">
              <Link
                to="https://www.instagram.com/aera.kz/"
                target="_blank"
                className="active:translate-y-px"
              >
                <img src={instagramLogo} alt="Instagram" width={50} />
              </Link>
              <Link
                to="https://wa.me/message/5R657AQ5C3E7B1"
                target="_blank"
                className="active:translate-y-px"
              >
                <img src={whatsappLogo} alt="WhatsApp" width={53} />
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
