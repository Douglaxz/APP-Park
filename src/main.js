import "../src/firebase.config.js";
import "./assets/main.css";
import "@/modules/auth";
import "@/modules/price";
import "@/modules/model";
import "@/modules/park";

import "@/modules/brand";


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
