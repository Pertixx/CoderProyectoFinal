import * as Localization from "expo-localization";

import i18n from "i18n-js";
import icons from "./icons";
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

const ingredients = [
  {
    id: 1,
    name: "Pimienta",
    icon: icons.pepper,
  },
  {
    id: 2,
    name: "Pollo",
    icon: icons.chicken,
  },
  {
    id: 3,
    name: "Cilantro",
    icon: icons.coriander,
  },
  {
    id: 4,
    name: "Ajo",
    icon: icons.garlic,
  },
  {
    id: 5,
    name: "Hierba de limon",
    icon: icons.lemongrass,
  },
  {
    id: 6,
    name: "Aceite",
    icon: icons.oil,
  },
  {
    id: 7,
    name: "Cebolla",
    icon: icons.onion,
  },
  {
    id: 8,
    name: "Pasta",
    icon: icons.pasta,
  },
  {
    id: 9,
    name: "Sal",
    icon: icons.salt,
  },
  {
    id: 10,
    name: "Camaron",
    icon: icons.shrimp,
  },
  {
    id: 11,
    name: "Tomate",
    icon: icons.tomato,
  },
  {
    id: 12,
    name: "Papa",
    icon: icons.potato,
  },
  {
    id: 13,
    name: "Manzana",
    icon: icons.apple,
  },
];

export default {
  categories,
  ingredients,
};
