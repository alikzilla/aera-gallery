import Container from "../container/container";
import logo from "../../assets/logoM-white.png";
import instagramLogo from "../../assets/instagram.png";
import whatsappLogo from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <Container>
        <div className="flex items-start justify-between">
          {/* Logo and Rights Section */}
          <div className="flex flex-col items-start gap-2">
            <Link to="/">
              <img src={logo} alt="Company Logo" width={100} />
            </Link>
            <p className="text-white">© Все права защищены</p>
          </div>

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
      </Container>
    </footer>
  );
};

export default Footer;
