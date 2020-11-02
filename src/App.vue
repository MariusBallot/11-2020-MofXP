<template>
  <div id="app">
    <ThreeScene />
  </div>
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";

export default {
  name: "App",
  components: {
    ThreeScene,
  },
};
</script>

<style lang="stylus">
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
}
</style>
