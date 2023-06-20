<template>
  <el-input v-model="tags" @keyup.enter="search()">
    <template #append>
      <el-button @click="search()">
        <el-icon><Search /></el-icon>
      </el-button>
    </template>
  </el-input>
  <MasnoryView :tags="tags" />
</template>

<script>
import MasnoryView from "./components/MasnoryView.vue";

export default {
  name: "App",
  components: {
    MasnoryView,
  },
  data: function () {
    return {
      tags: "",
    };
  },
  methods: {
    search() {
      window.location.href =
        window.location.protocol +
        "//" +
        window.location.host +
        "?tags=" +
        this.tags;
    },
  },
  mounted() {
    this.tags = new URL(window.location.href).searchParams.get("tags");
    if (this.tags) {
      document.title = this.tags;
      console.log(this.tags);
    } else {
      console.log(this.tags);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10px;
}

.el-input__inner {
  font-family: "Genshin Impact";
}
</style>
