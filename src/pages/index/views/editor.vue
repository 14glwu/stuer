<template>
  <div class="editor-container">
    <div class="editor-header">
      <div class="header_name">{{header_name}}</div>
      <div class="header-opt">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="submitPost">确定</el-button>
      </div>
    </div>
    <div class="post-title">
      <input type="text" class="title-input" placeholder="文章标题：一句话说明你遇到的问题或想分享的经验">
    </div>
    <div class="editor">
      <div ref="editor_bar" class="editor-bar"></div>
      <div ref="editor_main" class="editor-main">
        <p>请输入内容</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header_name: '发表帖子',
      editor: null,
      title: '', // 帖子标题
      content: '' // 帖子内容
    };
  },
  mounted() {
    const E = window.wangEditor;
    this.editor = new E(this.$refs.editor_bar, this.$refs.editor_main);
    this.editor.create();
  },
  methods: {
    submitPost() {
      console.log(this.editor.txt.html());
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.editor-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: 5rem;
  font-size: 2rem;
  border-bottom: 1px solid #f1f1f1;
}
.header_name {
  color: $primary-color;
  font-weight: bold;
  &:before {
    content: '>> ';
  }
}
.post-title {
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  .title-input {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    text-align: left;
    font: 200 1.8rem 'microsoft yahei';
    height: 5rem;
    overflow: hidden;
    border: none;
    outline: none;
    white-space: nowrap;
  }
}
.editor {
  width: 100%;
  height: calc(100% - 10rem);
  padding: 0 2rem;
  font-size: 14px;
  .editor-bar {
    border: 1px solid #ddd;
  }
  .editor-main {
    height: calc(100% - 48px);
    border: 1px solid #ddd;
  }
}
</style>