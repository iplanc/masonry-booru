<template>
  <el-card>
    <video class="show" v-if="isVideo == true" controls>
      <source :src="show_url" />
    </video>
    <el-image class="show" :src="show_url" v-if="isVideo == false" lazy />
    <template #header>
      <el-tooltip effect="dark" placement="top">
        <template #content> 查看详情 </template>
        <el-button size="large" circle type="primary" v-if="isVideo == false">
          <el-icon @click="showDetail()"><Search /></el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip effect="dark" placement="top">
        <template #content>
          此图像为<b>缩略图</b>，请点击左侧详情按钮获取完整大小
        </template>
        <el-button size="large" circle v-if="isResampled" type="success">
          <el-icon><FullScreen /></el-icon>
        </el-button>
      </el-tooltip>

      <el-button size="large" circle v-if="isVideo" type="warning">
        <el-icon><VideoPlay /></el-icon>
      </el-button>
    </template>
  </el-card>

  <el-dialog v-model="detailDialogVisible" title="详情预览">
    <el-image :src="url"></el-image>
    <el-divider content-position="left">Tags</el-divider>
    <span v-for="(each, index) in tags.split(' ')" v-bind:key="index">
      <el-tag style="margin: 5px">{{ each }}</el-tag>
    </span>
  </el-dialog>
</template>

<script>
// import axios from "axios";

export default {
  name: "ItemView",
  props: {
    url: String,
    sample_url: String,
    tags: String,
  },
  data() {
    return {
      show_url: "",
      isResampled: false,
      isVideo: false,
      detailDialogVisible: false,
    };
  },
  methods: {
    showDetail() {
      this.detailDialogVisible = true;
    },
  },
  created() {
    if (this.sample_url != "") {
      this.show_url = this.sample_url;
      this.isResampled = true;
    } else {
      this.show_url = this.url;
      this.isResampled = false;
    }

    if (this.show_url.match(/\.mp4/gi)) {
      this.isVideo = true;
    }
  },
};
</script>

<style scoped>
.show {
  width: 100%;
  height: 100%;
}

.tags {
  white-space: nowrap;
}
</style>
