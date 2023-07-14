import { useStore } from "../../composables/useStore";
import { brandStore } from "./store";
import { router } from "@/router";
import { routes } from "./router";

//registrar a store local
const store = useStore();
store.registerModule("brand", brandStore);

//registrar as rotas locais
routes.forEach((route) => {
  router.addRoute(route);
});
