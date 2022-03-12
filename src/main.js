import { createApp } from "vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

import "bootstrap";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("Loading", Loading);
app.use(VueAxios, axios);
app.use(router);
app.mount("#app");
