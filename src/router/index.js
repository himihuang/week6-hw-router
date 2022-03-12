import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "",
        component: HomeView,
      },
      {
        path: "about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/CartView.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "products/:id",
        component: () => import("../views/ProductView.vue"),
      },
    ],
  },
  {
    path: "/admin/",
    component: () => import("../views/DashBoard.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/AdminProducts.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/AdminCoupoun.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/LogIn.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active", // Bootstrap
});

export default router;
