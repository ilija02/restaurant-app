import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Gallery from "../components/Gallery.vue";
import Menu from "../components/Menu.vue";
import MyAccount from "../components/MyAccount.vue";
import About from "../components/About.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/gallery", name: "Gallery", component: Gallery },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/my-account", name: "MyAccount", component: MyAccount },
  { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;