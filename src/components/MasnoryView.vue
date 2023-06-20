<template>
  <h1>搜索结果 共 {{ count }} 个</h1>
  <div class="masnory" v-infinite-scroll="load">
    <div class="item-view" v-for="each in posts" v-bind:key="each">
      <ItemView
        :url="each.file_url"
        :sample_url="each.sample_url"
        :tags="each.tags"
      />
    </div>
  </div>
</template>

<script>
import ItemView from "@/components/ItemView.vue";
import axios from "axios";

export default {
  name: "MasnoryView",
  props: {
    tags: String,
  },
  data: function () {
    return {
      count: "",
      posts: [],
      pid: 1,
    };
  },
  components: {
    ItemView,
  },
  methods: {
    getImageList(tags, pid = 0) {
      axios({
        method: "GET",
        url: "/index.php?page=dapi&s=post&q=index&limit=15&json=1",
        crossDomain: true,
        params: {
          tags: tags,
          pid: pid,
        },
      })
        .then((response) => {
          this.count = response.data["@attributes"].count;
          response.data.post.forEach((each) => {
            var temp = {};
            temp.file_url = each.file_url;
            temp.preview_url = each.preview_url;
            temp.sample_url = each.sample_url;
            temp.tags = each.tags;
            this.posts.push(temp);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    load() {
      this.getImageList(this.tags, this.pid++);
    },
  },
};
</script>

<style scoped>
.masnory {
  column-count: 4;
  column-gap: 10px;
}

.masnory .item-view {
  /*width: calc(100% / 4 - 20px);*/
  margin-bottom: 10px;
  break-inside: avoid;
}

h1 {
  font-family: "Genshin Impact";
}
</style>
