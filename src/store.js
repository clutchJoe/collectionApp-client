import Vue from "vue";
import Vuex from "vuex";
import collections from "./store/modules/collections";

Vue.use(Vuex);

export default new Vuex.Store({
    // state: {
    // },
    // mutations: {
    // },
    // actions: {
    // }
    modules: {
        collections
    }
});
