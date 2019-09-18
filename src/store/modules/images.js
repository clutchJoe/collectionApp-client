import axios from "axios";

const state = {
    images: [],
    allowTypes: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"]
};

const getters = {
    allImages: state => state.images
};

const actions = {
    async fetchImages({ commit }) {
        try {
            const response = await axios.get("http://localhost:4444/files");
            commit("setImages", response.data);
        } catch (err) {
            throw err;
        }
    },
    async addImages({ commit }, formData) {
        try {
            await axios.post("http://localhost:4444/post/image", formData);
            // post之后，再次执行上面的fetchCollections函数，更新数据
            await this._actions.fetchImages[0]();
        } catch (err) {
            throw err;
        }
    },
    async deleteImage({ commit }, id) {
        try {
            await axios.delete(`http://localhost:4444/files/${id}`);
            commit("removeImage", id);
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setImages: (state, datas) =>
        (state.images = datas
            .reverse()
            .filter(data => state.allowTypes.includes(data.contentType))
            .map(img => ({ ...img, createdAt: new Date(img.uploadDate) }))),
    removeImage: (state, id) => (state.images = state.images.filter(item => item._id != id))
};

export default {
    state,
    getters,
    actions,
    mutations
};
