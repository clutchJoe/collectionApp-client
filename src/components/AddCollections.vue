<template>
    <b-row class="mb-3" id="add-collections">
        <b-col class="col-md-8 m-auto shadow">
            <h1 class="h1" id="title">clutch collection</h1>
            <form action="/logout?_method=DELETE" method="POST" class="mb-3">
                <button type="submit" class="btn btn-secondary">
                    Log Out
                    <i class="fas fa-sign-out-alt ml-2"></i>
                </button>
            </form>
            <div>
                <b-tabs content-class="mt-3" fill>
                    <!-- File upload option -->
                    <FileForm />

                    <!-- Images upload option -->
                    <ImageForm />

                    <!-- Link upload option -->
                    <LinkForm />

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
import NoteForm from "../components/forms/NoteForm";
import FileForm from "../components/forms/FileForm";
import ImageForm from "../components/forms/ImageForm";
import LinkForm from "../components/forms/LinkForm";

export default {
    name: "AddCollections",
    components: {
        NoteForm,
        FileForm,
        ImageForm,
        LinkForm
    }
};
</script>

<style scoped>
</style>