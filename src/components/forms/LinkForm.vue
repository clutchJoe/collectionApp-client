<template>
    <b-tab title="Link">
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            :variant="showVariant"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >{{showMsg}}</b-alert>
        <form enctype="multipart/form-data" @submit.prevent="linkOnSubmit">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="link">* Enter Your Link</span>
                </div>
                <input
                    type="url"
                    placeholder="https://example.com/"
                    class="form-control text-display"
                    aria-describedby="link"
                    v-model="link"
                />
            </div>
            <div class="mb-3">
                <label for="link_text" class="float-left">Add Description (optional) :</label>
                <textarea v-model="link_text" class="form-control" id="link_text" rows="3"></textarea>
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
    name: "Link",
    data() {
        return {
            alertMsg: {
                // initMsg:"No Error",
                linkErr: "No link entered !",
                linkWarn: "Please improve the input project !",
                linkSucc: "Successfully saved !"
            },
            variant: ["danger", "warning", "success"],
            showMsg: "",
            showVariant: "primary",
            link: "",
            link_text: "",
            dismissSecs: 4,
            dismissCountDown: 0
        };
    },
    methods: {
        ...mapActions(["addLink"]),
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        async linkOnSubmit() {
            if (this.link === "") {
                this.showMsg = this.alertMsg.linkErr;
                this.showVariant = this.variant[0];
                this.dismissCountDown = this.dismissSecs;
            } else {
                try {
                    const formData = new FormData();
                    formData.append("link", this.link);
                    formData.append("text", this.link_text);
                    await this.addLink(formData);
                    this.link = "";
                    this.link_text = "";
                    this.showMsg = this.alertMsg.linkSucc;
                    this.showVariant = this.variant[2];
                    this.dismissCountDown = this.dismissSecs;
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