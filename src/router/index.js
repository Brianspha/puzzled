import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/GameView.vue";
import GameMenu from "../views/GameMenu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GameMenu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: GameMenu,
  },
  {
    path: "/menu",
    name: "GameMenu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: GameMenu,
  },
  {
    path: "/game",
    name: "GameView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Game,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes: routes,
});

export default router;
