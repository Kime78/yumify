import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

import LoginForm from "../components/LoginForm.vue";
import RecipeViewer from "../components/RecipeViewer.vue";
import RegistrationForm from "../components/RegistrationForm.vue";

const routes = [
  { path: "/recipes", component: RecipeViewer },
  { path: "/", component: LoginForm },
  { path: "/register", component: RegistrationForm },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
