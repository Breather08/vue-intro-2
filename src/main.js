import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      MAX_NOTES: 10
    };
  },
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
