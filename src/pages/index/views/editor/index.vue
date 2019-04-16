<template>
  <div class="editor-container block">
    <div class="editor-header">
      <div class="header_name">{{header_name}}</div>
      <div class="header-opt">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="confirmPost">确定</el-button>
      </div>
    </div>
    <div class="post-title">
      <input
        type="text"
        class="title-input"
        placeholder="文章标题：一句话说明你遇到的问题或想分享的经验"
        v-model="form.title"
      >
    </div>
    <div class="editor">
      <div ref="editor_bar" class="editor-bar"></div>
      <div ref="editor_main" class="editor-main" style="z-index: 1000 !important">
        <p>请输入内容</p>
      </div>
    </div>

    <el-dialog title="帖子设置" class="dialog" :visible.sync="dialogVisible" top="25vh">
      <el-form :model="form">
        <el-form-item label="发表区域" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择发表区域">
            <el-option label="讨论区" value="1"></el-option>
            <el-option label="求职区" value="2"></el-option>
            <el-option label="找对象" value="3"></el-option>
            <el-option label="匿名区" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标签" :label-width="formLabelWidth">
          <el-tag
            :key="tag"
            v-for="tag in form.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header_name: '写帖子',
      editor: null,
      form: {
        title: '', // 帖子标题
        content: '', // 帖子内容
        type: '', // 帖子类型
        tags: [
          // 帖子标签
          '标签一',
          '标签二',
          '标签三'
        ]
      },
      dialogVisible: false,
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: ''
    };
  },
  mounted() {
    const E = window.wangEditor;
    this.editor = new E(this.$refs.editor_bar, this.$refs.editor_main);
    this.editor.create();
  },
  methods: {
    confirmPost() {
      this.dialogVisible = true;
    },
    handleClose(tag) {
      this.form.tags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.editor-container {
  position: relative;
  width: 100%;
  height: 806px;
  background: #fff;
  margin: 1rem auto;
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
    padding: 0 1rem;
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
    z-index: 1100 !important;
    height: calc(100% - 48px);
    border: 1px solid #ddd;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
