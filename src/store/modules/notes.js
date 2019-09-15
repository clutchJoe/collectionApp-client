import axios from "axios";

const state = {
    // errMsg: "",
    notes: []
};

const getters = {
    allNotes: state => state.notes
};

const actions = {
    async fetchNotes({ commit }) {
        const response = await axios.get("http://localhost:4444/notes");
        commit("setNotes", response.data);
    },
    async addNotes({ commit }, formData) {
        const response = await axios.post("http://localhost:4444/note", formData);
        await this._actions.fetchNotes[0]();
    },
    async deleteNote({ commit }, id) {
        await axios.delete(`http://localhost:4444/notes/${id}`);
        commit("removeNote", id);
    }
};

const mutations = {
    setNotes: (state, datas) => (state.notes = datas.reverse()),
    removeNote: (state, id) => (state.notes = state.notes.filter(item => item._id != id))
};

export default {
    state,
    getters,
    actions,
    mutations
};
