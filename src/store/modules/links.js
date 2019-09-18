import axios from "axios";

const state = {
    links: []
};

const getters = {
    allLinks: state => state.links
};

const actions = {
    async fetchLinks({ commit }) {
        try {
            const response = await axios.get("http://localhost:4444/links");
            commit("setLinks", response.data);
        } catch (err) {
            throw err;
        }
    },
    async addLink({ commit }, formData) {
        try {
            await axios.post("http://localhost:4444/post/link", formData);
            await this._actions.fetchLinks[0]();
        } catch (err) {
            throw err;
        }
    },
    async deleteLink({ commit }, id) {
        try {
            await axios.delete(`http://localhost:4444/links/${id}`);
            commit("removeLink", id);
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setLinks: (state, datas) =>
        (state.links = datas.reverse().map(link => ({ ...link, createdAt: new Date(link.createdAt) }))),
    removeLink: (state, id) => (state.links = state.links.filter(item => item._id != id))
};

export default {
    state,
    getters,
    actions,
    mutations
};
