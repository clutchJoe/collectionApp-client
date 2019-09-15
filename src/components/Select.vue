<template>
    <b-row no-gutters>
        <b-col class="col-md-7 m-auto mb-3">
            <b-card no-body>
                <b-tabs card fill>
                    <b-tab title="Files" active>
                        <b-card-text>
                            <Collections />
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Images">
                        <b-card-text></b-card-text>
                    </b-tab>
                    <b-tab title="Links">
                        <b-card-text></b-card-text>
                    </b-tab>
                    <b-tab title="Notes">
                        <b-card-text>
                            <Notes />
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import Collections from "./selects/Collections";
import Notes from "./selects/Notes";

export default {
    name: "Select",
    components: {
        Collections,
        Notes
    }
};
</script>

<style>
</style>