import { Menu, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

let countries = [
  {
    code: "kz",
    name: "Қазақша", // Changed to the correct native name for Kazakh
    country_code: "kz", // Flag for Kazakhstan
  },
  {
    code: "ru",
    name: "Русский", // Russian
    country_code: "ru", // Flag for Russia
  },
];

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Menu
        as="div"
        className="px-3 pl-0 relative flex transition-all duration-300 active:translate-y-px"
        aria-label="usermenu"
      >
        <Menu.Button
          className="group w-full  text-sm text-left font-medium text-gray-700 focus:outline-none"
          aria-label="usermenu-button"
        >
          <span className="flex w-full justify-between items-center">
            <GlobeAltIcon className="h-7 w-7 cursor-pointer text-black transition-all duration-300 hover:text-yellow-600" />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            aria-label="menu-item-container"
            className="z-10 mx-3 origin-top absolute left-[-80px] top-[42px] right-0 min-w-max mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
          >
            <div className="px-1 py-1 " aria-label="menu-items">
              {countries.map((lng) => {
                return (
                  <Menu.Item key={lng.code}>
                    <button
                      className={classNames(
                        "w-full flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      )}
                      onClick={() => i18n.changeLanguage(lng.code)} // used to change language that needs to be rendered
                      disabled={i18n.language === lng.code}
                    >
                      <span>{lng.name}</span>
                    </button>
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
