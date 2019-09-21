import axios from "axios";

const state = {
    collections: [],
    allowTypes: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"]
};

const getters = {
    allCollections: state => state.collections
};

const actions = {
    async fetchCollections({ commit }) {
        try {
            const response = await axios.get("/files");
            commit("setCollections", response.data);
        } catch (err) {
            throw err;
        }
    },
    async addCollection({ commit }, formData) {
        try {
            await axios.post("post/file", formData);
            // post之后，再次执行上面的fetchCollections函数，更新数据
            await this._actions.fetchCollections[0]();
        } catch (err) {
            throw err;
        }
    },
    async deleteCollection({ commit }, id) {
        try {
            await axios.delete(`/files/${id}`);
            commit("removeCollection", id);
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setCollections: (state, datas) =>
        (state.collections = datas
            .reverse()
            .filter(data => !state.allowTypes.includes(data.contentType))
            .map(file => ({ ...file, createdAt: new Date(file.uploadDate) }))),
    removeCollection: (state, id) => (state.collections = state.collections.filter(item => item._id != id))
};

export default {
    state,
    getters,
    actions,
    mutations
};
