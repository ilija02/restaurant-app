import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage.vue";
import Gallery from "@/pages/GalleryPage.vue";
import Menu from "@/pages/MenuPage.vue";
import MyAccount from "@/pages/MyAccountPage.vue";
import About from "@/pages/AboutPage.vue";
import DishDetailsPage from "@/pages/DishDetailsPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/gallery", name: "Gallery", component: Gallery },
  { path: "/menu/:category?", name: "Menu", component: Menu }, // optional category parameter
  { path: "/my-account", name: "MyAccount", component: MyAccount },
  { path: "/about", name: "About", component: About },
  {
    path: "/dish/:id",
    name: "DishDetail",
    component: DishDetailsPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
