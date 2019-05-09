<template>
  <div class="editor-container block">
    <div class="editor-header">
      <div class="header-left">
        <div class="header-name">{{header_name}}</div>
        <a href="javascript:void(0)" class="header-daft">{{header_draft}}</a>
      </div>
      <div>
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="setPost">确定</el-button>
      </div>
    </div>
    <div class="post-title">
      <input
        type="text"
        class="title-input"
        placeholder="帖子标题：一句话说明你遇到的问题或想分享的经验"
        v-model="form.title"
        @input="titleChange"
      >
    </div>
    <div class="editor">
      <div ref="editor_bar" class="editor-bar"></div>
      <div ref="editor_main" class="editor-main"></div>
    </div>

    <el-dialog title="帖子设置" class="dialog" :visible.sync="dialogVisible" top="25vh">
      <el-form :model="form">
        <el-form-item label="发表区域" :label-width="formLabelWidth">
          <el-select v-model.number="form.type" placeholder="请选择发表区域">
            <el-option label="讨论区" :value="1"></el-option>
            <el-option label="树洞" :value="2"></el-option>
            <el-option label="找对象" :value="3"></el-option>
            <el-option label="求职区" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标签" :label-width="formLabelWidth" v-if="form.type === 1">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createPost, updatePost, getPostById } from '@/api';
export default {
  data() {
    return {
      header_name: '写帖子',
      header_draft: '',
      editor: null, // 富文本编辑器
      isEdit: false, // 用于判断是编辑帖子还是发表帖子
      form: {
        title: '', // 帖子标题
        content: '', // 帖子内容
        type: 1, // 帖子发表区域，默认为1讨论区
        tags: [
          // 帖子标签
        ]
      },
      titleTimer: null,
      contentTimer: null,
      dialogVisible: false,
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: ''
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  async mounted() {
    this.initEditor(); // 初始化编辑器
    await this.initContent(); // 初始化帖子内容
  },
  beforeDestroy() {
    // 清空页面的定时器
    if (this.contentTimer) {
      clearTimeout(this.contentTimer);
      self.contentTimer = null;
    }
    if (this.titleTimer) {
      clearTimeout(this.titleTimer);
      self.titleTimer = null;
    }
  },
  methods: {
    // 提交帖子
    async submitPost() {
      this.dialogVisible = false;

      // 参数校验
      const text = this.editor.txt.text();
      if (!text) {
        this.$message.error('内容不能为空');
        return;
      }
      if (this.form.type !== 2 && !this.form.title) {
        this.$message.error('标题不能为空');
        return;
      }

      this.form.content = this.editor.txt.html(); // 将富文本内容赋值给表单的content
      if (!this.isEdit) {
        const result = await createPost(this.form);
        if (result.code === 0) {
          this.$message.success('帖子发表成功');
          localStorage.removeItem('draft');
          localStorage.removeItem('draftTitle');
          this.header_draft = '';
        } else {
          this.$message.error('帖子发表失败');
        }
      } else {
        const result = await updatePost(this.form);
        if (result.code === 0) {
          this.$message.success('帖子更新成功');
        } else {
          this.$message.error('帖子更新失败');
        }
      }
    },
    // 设置帖子
    setPost() {
      this.dialogVisible = true;
    },
    // 删除标签
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    // 显示输入标签框
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 输入标签
    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 监听标题的变化
    titleChange() {
      const self = this; // this在回调函数中会被改变，因此用self
      self.header_draft = '草稿保存中...';
      if (self.titleTimer) {
        // 防抖处理
        clearTimeout(self.titleTimer);
        self.titleTimer = null;
      }
      const title = self.form.title;
      // 监听输入变化,然后保存到storage中，从而实现草稿功能
      self.titleTimer = setTimeout(function() {
        localStorage.setItem('draftTitle', title);
        self.header_draft = '草稿已保存';
      }, 1500);
    },
    // 初始化编辑器
    initEditor() {
      const E = window.wangEditor;
      this.editor = new E(this.$refs.editor_bar, this.$refs.editor_main);
      this.editor.customConfig.zIndex = 100; // 层级
      this.editor.customConfig.uploadImgServer = '/api/uploadImgsForPost'; // 上传图片到服务器的地址
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 上传图片的最大大小
      this.editor.customConfig.uploadImgMaxLength = 5; // 上传图片的最大个数
      this.editor.customConfig.onchangeTimeout = 1000; // onchange 触发的延迟时间, 单位 ms
      const self = this; // this在回调函数中会被改变，因此用self
      // 错误监听
      this.editor.customConfig.customAlert = function(info) {
        // info 是需要提示的内容
        self.$message.error(info);
      };

      // 监听帖子内容的变化
      this.editor.customConfig.onchange = (html) => {
        if (self.contentTimer) {
          // 防抖处理
          clearTimeout(self.contentTimer);
          self.contentTimer = null;
        }
        // 监听输入变化,然后保存到storage中，从而实现草稿功能
        self.header_draft = '草稿保存中...';
        localStorage.setItem('draft', html);
        self.contentTimer = setTimeout(function() {
          self.header_draft = '草稿已保存';
        }, 2000);
      };
      this.editor.create();
    },
    // 初始化帖子内容
    async initContent() {
      // 如果草稿箱不为空的话
      const draft = localStorage.getItem('draft');
      const draftTitle = localStorage.getItem('draftTitle');
      if (draft) {
        this.editor.txt.html(draft);
      }
      if (draftTitle) {
        this.form.title = draftTitle;
      }
      // 如果设置完草稿后，文本内容为空的话，则设置默认提示文字
      const text = this.editor.txt.text();
      if (!text) {
        this.editor.txt.html('<p>来写点东西，抒发你心中所想吧！！！</p>');
      }
      // 如果是编辑帖子
      if (this.$route.query.id) {
        this.isEdit = true;
        const result = await getPostById(this.$route.query.id);
        if (result.code === 0) {
          const post = result.data;
          // 判断是否为帖子主人,不是则跳转至首页，当然如果帖子类型为树洞，也跳转至首页
          if (post.userId !== this.user.id || post.type === 2) {
            this.$route.push('/');
          } else {
            this.form = post;
            if (post.content) {
              // 如果帖子不为空的话
              this.editor.txt.html(post.content);
            }
          }
        }
      }
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
  border-bottom: 1px solid #f1f1f1;
}
.header {
  &-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &-daft {
    font-size: 1.2rem;
    color: $link-color;
  }
  &-name {
    margin-right: 1rem;
    font-size: 2rem;
    color: $primary-color;
    font-weight: bold;
    &:before {
      content: '>> ';
    }
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
  font-size: 1.25rem;
  .editor-bar {
    border: 1px solid #ddd;
  }
  .editor-main {
    height: calc(100% - 4rem);
    border: 1px solid #ddd;
  }
}
.el-tag + .el-tag {
  margin-left: 1rem;
}
.button-new-tag {
  margin-left: 1rem;
  height: 3rem;
  line-height: 3rem;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 8rem;
  margin-left: 1rem;
  vertical-align: bottom;
}
</style>
