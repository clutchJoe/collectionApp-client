<template>
    <b-row no-gutters id="collections">
        <b-col
            class="col-12 mx-auto mb-3"
            v-for="(item, index) in allCollections"
            :key="item._id"
            :index="index"
        >
            <b-card no-body class="overflow-hidden d-flex flex-column justify-content-around cards">
                <b-row no-gutters>
                    <b-col class="col-md-3 d-flex justify-content-center align-content-center">
                        <div style="width:100%;height:100%;font-size:5.7rem;text-align:center;">
                            <i class="fas fa-file-alt" v-if="!item.isImg"></i>
                            <i class="fas fa-file-image" v-if="item.isImg"></i>
                        </div>
                    </b-col>
                    <b-col class="col-9">
                        <b-card-body>
                            <b-card-title class="text-display text-left">{{item.originalname}}</b-card-title>
                            <b-card-text class="text-display text-left">
                                <small class="text-muted">Desc:</small>
                                <br />
                                {{item.description === "" ? item.description = "No description" : item.description}}
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
                        <b-button
                            @click="downloadFile(item.filename,item.originalname,item.contentType)"
                            class="btn-info btns"
                        >
                            Download
                            <i class="fas fa-file-download ml-2"></i>
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import fs from "fs";

export default {
    name: "Collections",
    methods: {
        ...mapActions(["fetchCollections", "deleteCollection"]),
        showMsg(id) {
            this.deleteMsg = "";
            this.$bvModal
                .msgBoxConfirm("Confirm delete this item?", { okTitle: "Yes" })
                .then(value => {
                    // this.deleteMsg = value;
                    // console.log(this.deleteMsg);
                    if (value) {
                        this.deleteCollection(id);
                    }
                })
                .catch(err => {
                    throw err;
                });
        },
        downloadFile(filename, originalname, type) {
            return axios({
                url: `http://localhost:4444/download/${filename}`,
                method: "post",
                responseType: "blob"
            })
                .then(function(res) {
                    const blob = new Blob([res.data], {
                        type: type
                    });
                    const downloadElement = document.createElement("a");
                    const href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = originalname; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                })
                .catch(err => console.log(err));
        }
    },
    created() {
        this.fetchCollections();
    },
    computed: mapGetters(["allCollections"])
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