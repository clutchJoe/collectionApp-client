<template>
    <b-row no-gutters id="collections">
        <b-col
            class="col-12 mx-auto mb-3"
            v-for="(item, index) in allNotes"
            :key="item._id"
            :index="index"
        >
            <b-card no-body class="overflow-hidden d-flex flex-column justify-content-around cards">
                <b-row no-gutters>
                    <b-col class="col-md-3 d-flex justify-content-center align-content-center">
                        <div style="width:100%;height:100%;font-size:5.7rem;text-align:center;">
                            <i class="fas fa-sticky-note"></i>
                        </div>
                    </b-col>
                    <b-col class="col-9">
                        <b-card-body>
                            <b-card-title class="text-display text-left">{{item.topic}}</b-card-title>
                            <b-card-text class="text-display text-left">
                                <small class="text-muted">Desc:</small>
                                <br />
                                {{item.note}}
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
                <b-row no-gutters>
                    <b-col class="col-12 m-auto d-flex justify-content-around">
                        <b-button @click="showMsg(item._id)" class="btn-danger btns">
                            Delete
                            <i class="fas fa-trash ml-2"></i>
                        </b-button>
                        <!-- <b-button class="btn-info btns">
                            Download
                            <i class="fas fa-file-download ml-2"></i>
                        </b-button>-->
                    </b-col>
                </b-row>
            </b-card>
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
                    // this.deleteMsg = value;
                    // console.log(this.deleteMsg);
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