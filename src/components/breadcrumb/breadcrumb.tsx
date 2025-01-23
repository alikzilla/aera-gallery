import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Breadcrumb = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  return (
    <nav className="mb-5 text-gray-500 text-sm">
      <Link to="/" className="hover:text-yellow-600 active:translate-y-px">
        {t("navigation.home")}
      </Link>{" "}
      /<span className="text-gray-700"> {name}</span>
    </nav>
  );
};

export default Breadcrumb;
