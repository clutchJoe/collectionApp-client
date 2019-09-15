import axios from "axios";

const state = {
    // errMsg: "",
    collections: []
};

const getters = {
    allCollections: state => state.collections,
    errMsg: state => state.errMsg
};

const actions = {
    async fetchCollections({ commit }) {
        const response = await axios.get("http://localhost:4444/files");
        commit("setCollections", response.data);
    },
    async addCollection({ commit }, formData) {
        await axios.post("http://localhost:4444/file", formData);
        // post之后，再次执行上面的fetchCollections函数，更新数据
        await this._actions.fetchCollections[0]();
    },
    async deleteCollection({ commit }, id) {
        const reponse = await axios.delete(`http://localhost:4444/files/${id}`);
        commit("removeCollection", id);
    }
};

const mutations = {
    setCollections: (state, datas) => (state.collections = datas.reverse()),
    removeCollection: (state, id) => (state.collections = state.collections.filter(item => item._id != id))
    // newCollection: (state, data) => state.collections.unshift(data)
};

export default {
    state,
    getters,
    actions,
    mutations
};
