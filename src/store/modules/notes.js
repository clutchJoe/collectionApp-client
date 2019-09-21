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
        try {
            const response = await axios.get("/notes");
            commit("setNotes", response.data);
        } catch (err) {
            throw err;
        }
    },
    async addNotes({ commit }, formData) {
        try {
            await axios.post("/post/note", formData);
            await this._actions.fetchNotes[0]();
        } catch (err) {
            throw err;
        }
    },
    async deleteNote({ commit }, id) {
        try {
            await axios.delete(`/notes/${id}`);
            commit("removeNote", id);
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setNotes: (state, datas) =>
        (state.notes = datas.reverse().map(note => ({ ...note, createdAt: new Date(note.createdAt) }))),
    removeNote: (state, id) => (state.notes = state.notes.filter(item => item._id != id))
};

export default {
    state,
    getters,
    actions,
    mutations
};
