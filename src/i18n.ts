import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "./locales/en/translation.json";
import common_ru from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  lng: "en",
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    ru: {
      common: common_ru,
    },
  },

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
