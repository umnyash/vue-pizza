export const routes = [
  {
    path: "",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { layout: "AppMainLayout" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: "AppBaseLayout" },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
    meta: { layout: "AppMainLayout" },
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/AccountView.vue"),
    meta: { layout: "AppMainLayout" },
    children: [
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/OrdersView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
      },
    ],
  },
];
