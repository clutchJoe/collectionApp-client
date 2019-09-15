<template>
    <b-container class="home">
        <AddCollections />
        <Select />
    </b-container>
</template>

<script>
// @ is an alias to /src
import AddCollections from "@/components/AddCollections.vue";
import Select from "@/components/Select.vue";

export default {
    name: "home",
    components: {
        AddCollections,
        Select
    }
};
</script>
