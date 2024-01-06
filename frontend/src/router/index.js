import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

import LoginForm from "../components/LoginForm.vue";
import RecipeViewer from "../components/RecipeViewer.vue";
import RegistrationForm from "../components/RegistrationForm.vue";

export var loggedInID = 0;

export const setLoggedInID = (userId) => {
  loggedInID = userId;
};

const routes = [
  {
    path: "/recipes",
    component: RecipeViewer,
    beforeEnter: (to, _, next) => {
      if (loggedInID == 0)
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      else next();
    },
  },
  { path: "/", component: LoginForm },
  { path: "/register", component: RegistrationForm },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
