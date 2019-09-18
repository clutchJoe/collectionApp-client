<template>
    <b-row no-gutters id="collections">
        <b-col
            class="col-12 mx-auto mb-3"
            v-for="(item, index) in allLinks"
            :key="item._id"
            :index="index"
        >
            <b-card no-body class="overflow-hidden d-flex flex-column justify-content-around cards">
                <b-row no-gutters>
                    <div class="col-3 text-center px-1" style="font-size:5rem;">
                        <i class="fas fa-link"></i>
                    </div>
                    <div class="col-9">
                        <div class="card-body px-3">
                            <h5
                                class="card-title text-display text-left mb-1"
                            >{{item.title === "" ? item.title = "No Title" : item.title}}</h5>
                            <b-row no-gutters>
                                <b-col class="col-6">
                                    <p class="card-text text-display text-left">
                                        <small class="text-muted">Desc:</small>
                                        <br />
                                        {{item.description === "" ? item.description = "No description" : item.description}}
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
                            <b-row no-gutters>
                                <p class="text-muted text-truncate mb-1">{{item.domain}}</p>
                            </b-row>
                        </div>
                    </div>
                </b-row>
                <b-row no-gutters>
                    <b-col class="col-12 m-auto d-flex justify-content-around">
                        <b-button @click="showMsg(item._id)" class="btn-danger btns">
                            Delete
                            <i class="fas fa-trash ml-2"></i>
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Links",
    methods: {
        ...mapActions(["fetchLinks", "deleteLink"]),
        showMsg(id) {
            this.deleteMsg = "";
            this.$bvModal
                .msgBoxConfirm("Confirm delete this item?", { okTitle: "Yes" })
                .then(value => {
                    if (value) {
                        this.deleteLink(id);
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
    },
    created() {
        this.fetchLinks();
    },
    computed: mapGetters(["allLinks"])
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