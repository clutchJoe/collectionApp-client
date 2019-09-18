import Vue from "vue";
import Vuex from "vuex";
import collections from "./store/modules/collections";
import images from "./store/modules/images";
import notes from "./store/modules/notes";
import links from "./store/modules/links";

Vue.use(Vuex);

export default new Vuex.Store({
    // state: {
    // },
    // mutations: {
    // },
    // actions: {
    // }
    modules: {
        collections,
        images,
        notes,
        links
    }
});
