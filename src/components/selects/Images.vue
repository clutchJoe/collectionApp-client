<template>
    <b-row no-gutters id="collections">
        <b-col
            class="col-12 mx-auto mb-3"
            v-for="(item, index) in allImages"
            :key="item._id"
            :index="index"
        >
            <b-card no-body class="overflow-hidden d-flex flex-column justify-content-around cards">
                <b-row no-gutters>
                    <div class="col-3 text-center px-1" style="font-size:5.4rem;">
                        <i class="fas fa-file-image"></i>
                    </div>
                    <div class="col-9">
                        <div class="card-body px-3">
                            <h5 class="card-title text-truncate text-left">{{item.originalname}}</h5>
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
                        </div>
                    </div>
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

export default {
    name: "Images",
    methods: {
        ...mapActions(["fetchImages", "deleteImage"]),
        showMsg(id) {
            this.deleteMsg = "";
            this.$bvModal
                .msgBoxConfirm("Confirm delete this item?", { okTitle: "Yes" })
                .then(value => {
                    if (value) {
                        this.deleteImage(id);
                    }
                })
                .catch(err => {
                    throw err;
                });
        },
        downloadFile(filename, originalname, type) {
            return axios({
                url: `/download/${filename}`,
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
                .catch(err => {
                    throw err;
                });
        }
    },
    created() {
        this.fetchImages();
    },
    computed: mapGetters(["allImages"])
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