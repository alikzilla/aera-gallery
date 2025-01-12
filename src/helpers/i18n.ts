import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import ru from "../assets/locales/ru/translation.json";
import kz from "../assets/locales/kz/translation.json";

const fallbackLng = ["ru"];
const supportedLngs = ["ru", "kz"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru
      },
      kz: {
        translation: kz
      }
    },
    fallbackLng, 
    supportedLngs, // Explicitly define supported languages
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
