<template>
    <b-row no-gutters>
        <b-col class="col-md-8 m-auto mb-3">
            <b-card no-body w-100>
                <b-tabs card fill>
                    <b-tab title="Files" active>
                        <b-card-text>
                            <Collections />
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Images">
                        <b-card-text>
                            <Images />
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Links">
                        <b-card-text>
                            <Links />
                        </b-card-text>
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
import Images from "./selects/Images";
import Notes from "./selects/Notes";
import Links from "./selects/Links";

export default {
    name: "Select",
    components: {
        Collections,
        Images,
        Notes,
        Links
    }
};
</script>

<style>
</style>