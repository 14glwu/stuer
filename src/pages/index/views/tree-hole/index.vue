<template>
  <div class="discuss_container">
    <div class="content-left block">
      <div class="discuss-header">
        <h2 class="block-title">树洞</h2>
      </div>
      <div class="discuss-main">
        <div class="discuss-main-head">
          <div class="editor">
            <div ref="editor_bar" class="editor-bar"></div>
            <div ref="editor_main" class="editor-main">
              <p>有什么秘密或者悄悄话就丢进来吧！！！</p>
            </div>
            <div class="editor-foot">
              <el-button type="primary" size="small" @click="submitTreeHole">丢进树洞</el-button>
            </div>
          </div>
        </div>
        <div class="discuss-main-content">
          <ul class="post-list">
            <li class="post-list-item" v-for="(post, index) in posts" :key="index">
              <div class="post-content-box">
                <div v-html="post.content"></div>
              </div>
              <div class="post-detail">
                <div class="post-detail-tips">
                  <span>匿名用户&nbsp;</span>
                  <span
                    class="post-time"
                  >于&nbsp;&nbsp;{{$dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;发表</span>
                </div>
                <ul class="post-detail-opts">
                  <li v-for="(label,index)  in legendOpts " :key="index">
                    <span>{{ label }}</span>
                    <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                    <span class="seperate-pipe" v-if="!(index === legendOpts.length - 1)">|</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <el-pagination
            background
            v-if="total > pageSize"
            layout="prev, pager, next"
            :page-count="11"
            :total="total"
            :page-size="pageSize"
            :current-page="pageIndex"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="hot-tags block">
        <div class="discuss-header">
          <h2 class="block-title">热门话题</h2>
        </div>
        <div class="tags-main">
          <ul class="tags-list">
            <li class="tags-list-item">春招</li>
            <li class="tags-list-item">失眠</li>
            <li class="tags-list-item">毕业季</li>
            <li class="tags-list-item">复联4</li>
            <li class="tags-list-item">吃早餐</li>
            <li class="tags-list-item">权游</li>
            <li class="tags-list-item">利拉德</li>
            <li class="tags-list-item">测试</li>
            <li class="tags-list-item">腾讯</li>
            <li class="tags-list-item">阿里巴巴</li>
            <li class="tags-list-item">汕大小吴</li>
            <li class="tags-list-item">STUER平台</li>
            <li class="tags-list-item">ffffffffff</li>
          </ul>
        </div>
      </div>
      <div class="hot-posts block">
        <div class="discuss-header">
          <h2 class="block-title">热门树洞</h2>
        </div>
        <div class="hot-posts-main">
          <ul class="hot-posts-list">
            <li class="hot-posts-list-item">今天STUER平台正式上线了！！！！！！</li>
            <li class="hot-posts-list-item">腾讯春招启动啦，快来投递吧</li>
            <li class="hot-posts-list-item">汕大小吴生病募集捐款</li>
            <li class="hot-posts-list-item">你们开始春招了吗？</li>
            <li class="hot-posts-list-item">最近失眠头痛呀,好烦！！！！！！！！！！</li>
            <li class="hot-posts-list-item">毕业季去哪玩呀，有人有建议么</li>
            <li class="hot-posts-list-item">复联4看完了，好心痛呀！！</li>
            <li class="hot-posts-list-item">大家来讨论下该不该吃早餐</li>
            <li class="hot-posts-list-item">权游今天大结局，来讨论下？</li>
            <li class="hot-posts-list-item">利拉德绝杀雷霆，太给力了</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPosts } from '@/api';
import defaultAvatar from '@/assets/default-avatar.png';
import { createPost } from '@/api';
export default {
  data() {
    return {
      editor: null,
      tabOpts: ['最新发表', '最新回复'],
      tabActive: 0,
      pageIndex: 1, // 页码
      pageSize: 10, // 页面大小
      total: 0, // 数据总量
      type: 2, // 帖子类型，即发表区域
      order: 1, // 排序方式
      posts: [],
      legendOpts: ['点赞', '评论', '浏览'],
      defaultAvatar
    };
  },
  async mounted() {
    this.initEditor();
    await this.getPostsData();
  },
  methods: {
    async submitTreeHole() {
      const text = this.editor.txt.text();
      if (!text) {
        this.$message.error('内容不能为空');
      }
      const html = this.editor.txt.html();
      const result = await createPost({
        content: html,
        type: 2
      });
      if (result.code === 0) {
        this.$message.success('发表成功');
        await this.getPostsData(); // 更新树洞列表
      } else {
        this.$message.success('发表失败');
      }
    },
    // 初始化编辑器
    initEditor() {
      const E = window.wangEditor;
      this.editor = new E(this.$refs.editor_bar, this.$refs.editor_main);
      this.editor.customConfig.zIndex = 100; // 层级
      this.editor.customConfig.uploadImgServer = '/api/uploadImgsForPost'; // 上传图片到服务器的地址
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 上传图片的最大大小
      this.editor.customConfig.uploadImgMaxLength = 5; // 上传图片的最大个数
      const self = this; // this在回调函数中会被改变，因此用self
      // 错误监听
      this.editor.customConfig.customAlert = function(info) {
        // info 是需要提示的内容
        self.$message.error(info);
      };
      this.editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'link',
        'list',
        'justify',
        'quote',
        'emoticon',
        'image',
        'table',
        'code',
        'undo',
        'redo'
      ];

      this.editor.create();
    },
    async getPostsData() {
      const result = await getPosts({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        type: this.type,
        order: this.order
      });
      if (result.code === 0) {
        this.total = result.data.count;
        this.posts = result.data.posts;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.discuss_container {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  color: #333;
}
.content-left {
  width: 72%;
}
.content-right {
  width: 27%;
  margin-left: 1rem;
}
.discuss-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e2e2;
}
.discuss-main {
  padding: 2rem;
  &-head {
    height: 20rem;
  }
  &-content {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.editor {
  width: 100%;
  height: calc(100% - 4rem);
  font-size: 1.25rem;
  &-bar {
    border: 1px solid #ddd;
  }
  &-main {
    height: calc(100% - 3rem);
    border: 1px solid #ddd;
  }
  &-foot {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
}

.seperate-pipe {
  margin: 0 1em;
  color: #eee;
}
.post {
  &-list {
    margin-bottom: 2rem;
    &-item + &-item {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e2e2;
    }
  }
  &-content-box {
    font-size: 1.25rem;
    line-height: 1.5;
    background: #f6f6f6;
    padding: 0.4rem 0.8rem;
    margin: 1rem 0;
    p {
      margin: 0.4rem 0;
      font-size: 1.25rem;
      line-height: 1.5;
    }
  }
  &-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    color: #888;
    &-opts {
      display: flex;
      align-items: center;
      .opts-num {
        margin-left: 0.5rem;
      }
    }
  }
  &-top {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0 0.2rem;
    border-radius: 4px;
    font-size: 1rem;
    background: #25bb9b;
    color: #fff;
  }
  &-highlight {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0 0.3rem;
    border-radius: 4px;
    font-size: 1rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: #ff6547;
    color: #fff;
  }
}
.hot-tags {
  // height: 15rem;
}
.tags {
  &-main {
    padding: 1rem;
  }
  &-list {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    &-item {
      margin: 0.2rem 0.2rem;
      padding: 0 0.8rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 1rem;
      border: 1px solid #e2e2e2;
      cursor: pointer;
      &:hover {
        color: $primary-color;
        border: 1px solid $primary-color;
      }
    }
  }
}
.hot-posts {
  margin-top: 1.5rem;
  &-main {
    padding: 1rem;
    font-size: 1.2rem;
  }
  &-list {
    li + li {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e2e2;
    }
    &-item {
      width: 100%;
      overflow: hidden;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
