<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
        </div>-->
        <!-- <router-view /> -->
        <!-- <b-container>
            <Home />
        </b-container>-->
        <router-view />
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style>
body {
    background: #e8f7f0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 21px;
}
</style>
