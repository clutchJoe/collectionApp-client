<template>
    <b-row class="mb-3" id="add-collections">
        <b-col class="col-md-7 m-auto shadow">
            <h1 class="display-4" id="title">clutch collection</h1>
            <form action="http://localhost:4444/logout?_method=DELETE" method="POST" class="mb-3">
                <button type="submit" class="btn btn-secondary">
                    Log Out
                    <i class="fas fa-sign-out-alt ml-2"></i>
                </button>
            </form>
            <div>
                <b-tabs content-class="mt-3" fill>
                    <!-- File upload option -->
                    <FileFrom />

                    <!-- Images upload option -->
                    <b-tab title="Image">
                        <p>I'm the second tab</p>
                    </b-tab>

                    <!-- Link upload option -->
                    <b-tab title="Link">
                        <p>I'm the second tab</p>
                    </b-tab>

                    <!-- Note upload option -->
                    <NoteForm />
                    <!-- <b-tab title="Disabled" disabled>
                        <p>I'm a disabled tab!</p>
                    </b-tab>-->
                </b-tabs>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import { mapActions } from "vuex";
import NoteForm from "../components/forms/NoteForm";
import FileFrom from "../components/forms/FileForm";

export default {
    name: "AddCollections",
    components: {
        NoteForm,
        FileFrom
    }
};
</script>

<style scoped>
</style>