import enLang from "./entries/en-US";
import plLang from "./entries/pl-PL";

import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  pl: plLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.pl.data);

export default AppLocale;
