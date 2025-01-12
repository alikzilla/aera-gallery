import { useTranslation } from "react-i18next";

const Homepage = () => {
  const { t } = useTranslation();

  return <main>Hello world {t("hello")}</main>;
};

export default Homepage;
