import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

import LoginForm from "../components/LoginForm.vue";
import RecipeViewer from "../components/RecipeViewer.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import NewRecipeForm from "../components/NewRecipeForm.vue";
import UserDetailsViewer from "../components/UserDetailsViewer.vue";
import EditRecipe from "../components/EditRecipe.vue";

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
          path: "/",
        });
      else next();
    },
  },
  { path: "/", component: LoginForm },
  { path: "/register", component: RegistrationForm },
  { path: "/edit-recipe/:id", component: EditRecipe },
  { path: "/new-recipe", component: NewRecipeForm },
  { path: "/details", component: UserDetailsViewer },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
