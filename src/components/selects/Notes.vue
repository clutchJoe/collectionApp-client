<template>
    <b-row no-gutters id="collections">
        <b-col
            class="col-12 mx-auto mb-3"
            v-for="(item, index) in allNotes"
            :key="item._id"
            :index="index"
        >
            <div class="card mb-3 overflow-hidden d-flex flex-column justify-content-around cards">
                <div class="row no-gutters">
                    <div class="col-3 text-center px-1" style="font-size:5.4rem;">
                        <i class="fas fa-clipboard"></i>
                    </div>
                    <div class="col-9">
                        <div class="card-body px-3">
                            <h5 class="card-title text-display text-left">{{item.topic}}</h5>
                            <b-row no-gutters>
                                <b-col class="col-6">
                                    <p class="card-text text-display text-left">
                                        <small class="text-muted">Desc:</small>
                                        <br />
                                        {{item.note}}
                                    </p>
                                </b-col>
                                <b-col class="col-5 ml-auto">
                                    <p class="card-text text-display text-left">
                                        <small class="text-muted">CreatedAt:</small>
                                        <br />
                                        <i>{{`${item.createdAt.getDate()}/${item.createdAt.getMonth()+1}/${item.createdAt.getFullYear()}`}}</i>
                                    </p>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
                <b-row no-gutters>
                    <b-col class="col-12 m-auto d-flex justify-content-around">
                        <b-button @click="showMsg(item._id)" class="btn-danger btns">
                            Delete
                            <i class="fas fa-trash ml-2"></i>
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Notes",
    methods: {
        ...mapActions(["fetchNotes", "deleteNote"]),
        showMsg(id) {
            this.deleteMsg = "";
            this.$bvModal
                .msgBoxConfirm("Confirm delete this item?", { okTitle: "Yes" })
                .then(value => {
                    if (value) {
                        this.deleteNote(id);
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    created() {
        this.fetchNotes();
    },
    computed: mapGetters(["allNotes"])
};
</script>

<style scoped>
.cards {
    width: 100%;
    height: 12rem;
}
.text-display {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.btns {
    width: 8rem;
}
</style>