<template>
    <b-tab title="Note">
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            :variant="showVariant"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >{{showMsg}}</b-alert>
        <form enctype="multipart/form-data" @submit.prevent="noteOnSubmit">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="topic">* Enter Your Topic</span>
                </div>
                <input
                    type="text"
                    name="topic"
                    placeholder="Type Something..."
                    required
                    class="form-control"
                    aria-describedby="topic"
                    v-model="note_topic"
                />
            </div>
            <div class="mb-3">
                <label for="note_text" class="float-left">* Add Your Note :</label>
                <textarea v-model="note_text" class="form-control" id="note_text" rows="3" required></textarea>
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
    name: "NoteForm",
    data() {
        return {
            alertMsg: {
                // initMsg:"No Error",
                noteErr: "No topic and note entered !",
                noteWarn: "Please improve the input project !",
                noteSucc: "Successfully saved !"
            },
            variant: ["danger", "warning", "success"],
            showMsg: "",
            showVariant: "primary",
            note_topic: "",
            note_text: "",
            dismissSecs: 4,
            dismissCountDown: 0
        };
    },
    methods: {
        ...mapActions(["addNotes"]),
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        async noteOnSubmit() {
            if (this.note_topic == "" && this.note_text == "") {
                this.showMsg = this.alertMsg.noteErr;
                this.showVariant = this.variant[0];
                this.dismissCountDown = this.dismissSecs;
            } else if (this.note_topic == "" || this.note_text == "") {
                this.note_topic = "";
                this.note_text = "";
                this.showMsg = this.alertMsg.noteWarn;
                this.showVariant = this.variant[1];
                this.dismissCountDown = this.dismissSecs;
            } else {
                try {
                    const formData = new FormData();
                    formData.append("topic", this.note_topic);
                    formData.append("text", this.note_text);
                    await this.addNotes(formData);
                    this.note_topic = "";
                    this.note_text = "";
                    this.showMsg = this.alertMsg.noteSucc;
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
</style>