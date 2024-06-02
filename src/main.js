import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";

// Setup internationalization
import en_locale from "@/locales/en.js";
import sr_locale from "@/locales/sr.js";

const i18n = createI18n({
  locale: "sr", // default language
  messages: {
    en: en_locale, // English translations
    sr: sr_locale, // Serbian translations
  },
});

library.add(fas);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(i18n)
  .use(router)
  .use(store)
  .mount("#app");
