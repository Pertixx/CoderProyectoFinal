import * as Localization from "expo-localization";

import i18n from "i18n-js";
import setLocale from "../locale";

setLocale(Localization.locale.substring(0, 2));

const categories = [
  {
    id: 1,
    name: i18n.t("breakfast"),
  },
  {
    id: 2,
    name: i18n.t("lunch"),
  },
  {
    id: 3,
    name: i18n.t("snack"),
  },
  {
    id: 4,
    name: i18n.t("dinner"),
  },
];

export default {
  categories,
};
