import { createApp } from "vue";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";

library.add(fas);
createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");
