import { LOCALES } from "../../locale";

import navigation from "./navigation-en";
import homepageEn from "./homepage-en";

export default {
  [LOCALES.ENGLISH]: {
    "demo.languageSwitcher": "Language switch demo",
    "demo.fetchAvatar": "Fetch user's avatar",
    ...navigation,
    ...homepageEn,
  },
};
