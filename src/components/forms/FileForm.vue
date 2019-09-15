<template>
    <b-tab title="File" active>
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            :variant="showVariant"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >{{showMsg}}</b-alert>
        <form enctype="multipart/form-data" @submit.prevent="fileOnSubmit">
            <div class="custom-file mb-3">
                <input
                    ref="file"
                    type="file"
                    id="file"
                    class="custom-file-input"
                    @change="onSelect"
                />
                <label for="file" class="custom-file-label text-left">{{placeholder}}</label>
            </div>
            <div class="mb-3">
                <label for="text" class="float-left">Add Description (optional) :</label>
                <textarea v-model="text" class="form-control" id="text" rows="3"></textarea>
            </div>
            <div class="mb-3">
                <input type="submit" value="Submit" class="btn btn-primary btn-block" />
            </div>
        </form>
    </b-tab>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "FileForm",
    data() {
        return {
            placeholder: "Choose File",
            alertMsg: {
                fileErr: "No file selected !",
                fileWarn: "Only file are allowed !",
                fileSucc: "Upload succeed !"
            },
            variant: ["danger", "warning", "success"],
            showMsg: "",
            showVariant: "primary",
            file: "",
            text: "",
            dismissSecs: 4,
            dismissCountDown: 0
        };
    },
    methods: {
        ...mapActions(["addCollection"]),
        onSelect() {
            const file = this.$refs.file.files[0];
            console.log(this.$refs);
            const allowTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/svg+xml",
                "image/x-icon"
            ];
            if (!allowTypes.includes(file.type)) {
                this.file = file;
                this.placeholder = file.name;
                console.log(file);
            } else {
                this.$refs.file.value = "";
                this.showMsg = this.alertMsg.fileWarn;
                this.showVariant = this.variant[1];
                this.dismissCountDown = this.dismissSecs;
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        async fileOnSubmit() {
            if (this.file === "") {
                // 显示错误提示
                this.showMsg = this.alertMsg.fileErr;
                this.showVariant = this.variant[0];
                this.dismissCountDown = this.dismissSecs;
            } else {
                try {
                    const formData = new FormData();
                    formData.append("file", this.file);
                    formData.append("text", this.text);
                    await this.addCollection(formData);
                    // 显示成功提示
                    this.showMsg = this.alertMsg.fileSucc;
                    this.showVariant = this.variant[2];
                    this.dismissCountDown = this.dismissSecs;
                    // 初始化form内容
                    this.placeholder = "Choose File";
                    this.text = "";
                    this.file = "";
                    this.$refs.file.value = "";
                } catch (err) {
                    throw err;
                }
            }
        }
    }
};
</script>

<style scoped>
</style>