import antdPl from "antd/lib/locale-provider/pl_PL";
import appLocaleData from "react-intl/locale-data/pl";
import plMessages from "../locales/pl_PL.json";

const PlLang = {
  messages: {
    ...plMessages
  },
  antd: antdPl,
  locale: 'pl-PL',
  data: appLocaleData
};
export default PlLang;
