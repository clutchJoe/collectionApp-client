<template>
    <b-tab title="Image">
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
                    multiple="multiple"
                    class="custom-file-input"
                    @change="onSelect"
                />
                <label for="file" class="custom-file-label text-left text-display">{{placeholder}}</label>
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
    name: "ImageForm",
    data() {
        return {
            placeholder: "Choose Images(< 6pic)",
            alertMsg: {
                fileErr: "No Image selected !",
                fileWarn_1: "Only Image are allowed !",
                fileWarn_2: "Only allow up to five Images !",
                fileSucc: "Upload succeed !"
            },
            variant: ["danger", "warning", "success"],
            showMsg: "",
            showVariant: "primary",
            files: "",
            text: "",
            dismissSecs: 4,
            dismissCountDown: 0
        };
    },
    methods: {
        ...mapActions(["addImages"]),
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        warnAction_1() {
            this.$refs.file.value = "";
            this.showMsg = this.alertMsg.fileWarn_1;
            this.showVariant = this.variant[1];
            this.dismissCountDown = this.dismissSecs;
        },
        warnAction_2() {
            this.$refs.file.value = "";
            this.showMsg = this.alertMsg.fileWarn_2;
            this.showVariant = this.variant[1];
            this.dismissCountDown = this.dismissSecs;
        },
        onSelect() {
            const files = this.$refs.file.files;
            const allowTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/svg+xml",
                "image/x-icon"
            ];
            // 判断文件个数
            if (files.length > 5) return this.warnAction_2();
            // 判断是否存在非图片文件，有则返回警告msg
            for (let file of files) {
                if (!allowTypes.includes(file.type)) {
                    return this.warnAction_1();
                }
            }
            // 扩展运算符转换 fileList to Array
            this.files = [...files];
            // 处理placeholder显示文件名
            let str = [];
            for (let file of files) str.push(file.name);
            this.placeholder = str.join("、");
        },
        async fileOnSubmit() {
            if (this.files === "") {
                // 显示错误提示
                this.showMsg = this.alertMsg.fileErr;
                this.showVariant = this.variant[0];
                this.dismissCountDown = this.dismissSecs;
            } else {
                try {
                    const formData = new FormData();
                    // 上传多文件时，FormData的处理方法
                    this.files.forEach(file => {
                        formData.append("image", file);
                    });
                    formData.append("text", this.text);
                    await this.addImages(formData);
                    // 显示成功提示
                    this.showMsg = this.alertMsg.fileSucc;
                    this.showVariant = this.variant[2];
                    this.dismissCountDown = this.dismissSecs;
                    // 重新初始化form内容
                    this.placeholder = "Choose Images(< 6pic)";
                    this.text = "";
                    this.files = "";
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
.text-display {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>