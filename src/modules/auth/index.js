import { useStore } from "../../composables/useStore";
import { authStore } from "./store";

//registrar a store local
const store = useStore();
store.registerModule("auth", authStore);
