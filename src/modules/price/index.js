import { useStore } from "../../composables/useStore";
import { priceStore } from "./store";
import { router } from "@/router";
import { routes } from "./router";

//registrar a store local
const store = useStore();
store.registerModule("price", priceStore);

//registrar as rotas locais
routes.forEach((route) => {
  router.addRoute(route);
});
