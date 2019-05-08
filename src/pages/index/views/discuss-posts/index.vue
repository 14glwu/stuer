<template>
  <div class="discuss-wrap">
    <div class="discuss-box block" v-if="postExist">
      <div class="discuss-box-head">
        <h1 class="discuss-title">{{post.title}}</h1>
        <div class="discuss-author">
          <router-link :to="`/profile/${post.userId}`">
            <img :src="post.userInfo.avatar || defaultAvatar" alt="用户头像" class="post-avatar">
          </router-link>
          <div class="post-detail">
            <router-link
              :to="`/profile/${post.userId}`"
              class="post-user"
            >{{post.userInfo.nickName || 'stuer用户'}}</router-link>

            <div class="post-legend">
              <div class="post-time">
                <span>发表于&nbsp;{{post.createdAt?$dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss'): '-'}}&nbsp;，</span>
                <span>编辑于&nbsp;{{post.updatedAt?$dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss'): '-'}}</span>
              </div>
              <ul class="post-legend-opts">
                <li v-for="(label,index)  in legendOpts " :key="index">
                  <span>{{ label }}</span>
                  <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                  <span class="seperate-pipe" v-if="!(index === legendOpts.length - 1)">|</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="discuss-box-main">
        <div class="discuss-content" v-html="post.content"></div>
        <div class="discuss-foot">
          <ul class="opt-list">
            <li v-for="(opt, index) in postOpts" :key="index">
              <a href="javascript:void(0)" class="opt-list-item">
                <svg class="icon opt-list-icon" aria-hidden="true">
                  <use :xlink:href="`#icon-${opt.icon}`"></use>
                </svg>
                <span class="opt-list-name">{{ opt.name }}</span>
              </a>
              <span class="seperate-pipe" v-if="!(index === postOpts.length - 1)">|</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="comment-box block" v-if="postExist">
      <div class="comment-box-head">
        <h1 class="discuss-title">{{commentCount}}条评论</h1>
        <el-button type="primary" size="small" icon="el-icon-edit">评论</el-button>
      </div>
      <div class="comment-box-main">
        <div class="comment-list">
          <div class="comment-list-item" v-for="index in 10" :key="index">
            <span>还未完成</span>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-box block" v-if="postExist">
      <div class="editor">
        <div ref="editor_bar" class="editor-bar"></div>
        <div ref="editor_main" class="editor-main"></div>
        <div class="edit-box-foot">
          <el-button type="primary" size="small" icon="el-icon-edit">评论</el-button>
        </div>
      </div>
    </div>

    <div class="postNotFound block" v-if="!postExist">帖子不存在</div>
    <div class="toIndex" v-if="!postExist">
      <el-button type="primary" @click="routeToIndex">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default-avatar.png';
import { getPostById } from '@/api';
export default {
  data() {
    return {
      editor: null,
      post: {
        title: '',
        content: '',
        userId: undefined,
        createdAt: undefined,
        updateAt: undefined,
        userInfo: {
          avatar: '',
          nickName: ''
        }
      },
      commentCount: 0,
      comments: [
        {
          userId: undefined,
          nickName: ''
        }
      ],
      legendOpts: ['收藏', '点赞', '评论', '浏览'],
      postOpts: [
        {
          name: '收藏',
          icon: 'collect'
        },
        {
          name: '点赞',
          icon: 'dianzan'
        },
        {
          name: '评论',
          icon: 'comment'
        },
        {
          name: '举报',
          icon: 'report'
        }
      ],
      defaultAvatar,
      postExist: true // 帖子是否存在，默认为true
    };
  },
  async mounted() {
    await this.initPost();
    this.initEditor();
  },
  methods: {
    async initPost() {
      const id = this.$route.params.id;
      const result = await getPostById(id);
      if (result.code === 0) {
        this.post = result.data;
      } else {
        this.postExist = false;
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

      this.editor.create();
    },
    routeToIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.discuss-wrap {
  padding: 1rem 0;
  color: #333;
}
.discuss-box {
  &-head {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e2e2;
  }
  &-main {
    padding: 1.5rem 2rem;
  }
}
.discuss {
  &-author {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1.5rem;
  }
  &-title {
    font-size: 1.6rem;
    font-weight: 400;
    &:before {
      background: #25bb9b;
      content: '';
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      margin-right: 0.6rem;
      margin-bottom: 0.2rem;
      vertical-align: middle;
    }
  }
  &-content {
    font-size: 1.25rem;
  }
  &-foot {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    .opt-list {
      display: flex;
      font-size: 1.25rem;
      color: #888;
      &-item {
        color: #888;
        &:hover {
          color: #25bb9b;
        }
      }
      &-name {
        margin-left: 0.4rem;
      }
    }
  }
}
.post {
  &-avatar {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  &-detail {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin-left: 2rem;
    font-size: 1rem;
  }
  &-user {
    margin-bottom: 1rem;
    color: #333;
  }
  &-time {
    span {
      margin-right: 1rem;
    }
  }
  &-legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    &-opts {
      display: flex;
      align-items: center;
    }
  }
}
.seperate-pipe {
  margin: 0 0.8em;
  color: #eee;
}
.opts-num {
  margin-left: 0.5rem;
}
.comment {
  &-box {
    margin-top: 1rem;
    padding: 1.5rem 2rem;
    &-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-main {
      margin-top: 1.5rem;
    }
  }
  &-list {
    padding: 2rem;
    &-item {
      display: flex;
      align-items: center;
      height: 5rem;
      border-bottom: 1px solid #e2e2e2;
      &:last-child {
        border: none;
      }
    }
  }
}
.edit-box {
  margin-top: 1rem;
  padding: 2rem;
  height: 25rem;
  &-foot {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
}
.editor {
  width: 100%;
  height: calc(100% - 5rem);
  font-size: 1.25rem;
  .editor-bar {
    border: 1px solid #ddd;
  }
  .editor-main {
    height: 100%;
    border: 1px solid #ddd;
  }
}
.postNotFound {
  padding: 4rem;
  font-size: 2rem;
  color: $link-color;
  text-align: center;
}
.toIndex {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
