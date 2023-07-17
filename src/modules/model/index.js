import { useStore } from "../../composables/useStore";
import { modelStore } from "./store";
import { router } from "@/router";
import { routes } from "./router";

//registrar a store local
const store = useStore();
store.registerModule("model", modelStore);

//registrar as rotas locais
routes.forEach((route) => {
  router.addRoute(route);
});
