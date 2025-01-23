import { Container } from "../../components";
import map from "../../assets/map.png";
import { Link } from "react-router-dom";
import instagram from "../../assets/instagram.png";
import whatsapp from "../../assets/whatsapp.png";
import { useTranslation } from "react-i18next";

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10">
      <Container>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">{t("contacts.title")}</h1>
          </div>

          <div className="h-[500px] lg:h-auto flex flex-col-reverse lg:flex-row items-start justify-end lg:justify-between gap-10">
            <div className="md:w-[70%]">
              <div className="space-y-4">
                <div className="contact-item">
                  <p className="text-gray-500">{t("contacts.contact")}</p>
                  <h3 className="font-semibold">{t("contacts.phone")}</h3>
                </div>
                <div className="contact-item">
                  <p className="text-gray-500">{t("contacts.address")}</p>
                  <h3 className="font-semibold">{t("contacts.addressLine")}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Link
                  to="https://www.instagram.com/aera.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="active:translate-y-px"
                >
                  <img
                    src={instagram}
                    alt={t("contacts.instagram")}
                    width={50}
                  />
                </Link>
                <Link
                  to="https://wa.me/message/5R657AQ5C3E7B1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="active:translate-y-px"
                >
                  <img src={whatsapp} alt={t("contacts.whatsapp")} width={57} />
                </Link>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <Link
                to={
                  "https://2gis.kz/astana/firm/70000001076465027?m=71.425681%2C51.095228%2F16"
                }
                target="_blank"
                className="active:translate-y-px"
              >
                <img src={map} alt={t("contacts.map")} className="rounded" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
