<template>
  <div class="discuss_container">
    <div class="content-left block">
      <div class="discuss-header">
        <h2 class="block-title">讨论区</h2>
      </div>
      <div class="discuss-main">
        <div class="discuss-main-head">
          <ul class="discuss-tabs">
            <li v-for="(type, index) in selectTypeOpts" :key="index" class="tabs-item">
              <span class="tabs-item-label">{{type}}</span>
              <span class="seperate-pipe">|</span>
            </li>
          </ul>
        </div>
        <div class="discuss-main-content">
          <ul class="post-list">
            <li class="post-list-item" v-for="(post, index) in posts" :key="index">
              <router-link :to="`/profile/${post.userId}`">
                <img :src="post.userInfo.avatar || defaultAvatar" alt="用户头像" class="post-avatar">
              </router-link>
              <div class="post-detail">
                <div class="post-detail-head">
                  <router-link to="/discuss/1" target="_blank">{{post.title}}</router-link>
                  <span class="post-top" v-if="post.top">置顶</span>
                  <span class="post-highlight" v-if="post.highlight">精</span>
                </div>
                <div class="post-detail-foot">
                  <div class="foot-tips">
                    <router-link
                      class="post-user"
                      :to="`/profile/${post.userId}`"
                    >{{post.userInfo.nickName || 'stuer用户'}}</router-link>&nbsp;
                    <span
                      class="post-time"
                    >于&nbsp;&nbsp;{{$dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;发表</span>
                  </div>
                  <div class="foot-opts">
                    <span>
                      回复
                      <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                    </span>
                    <span class="seperate-pipe">|</span>
                    <span>
                      赞
                      <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                    </span>
                    <span class="seperate-pipe">|</span>
                    <span>
                      浏览
                      <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
          <h2 class="block-title">热门帖子</h2>
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
import { mapGetters } from 'vuex';
import { getPosts } from '@/api';
import defaultAvatar from '@/assets/default-avatar.png';
export default {
  data() {
    return {
      selectTypeOpts: ['最新发表', '最新回复', '热门帖', '精华帖'],
      selectType: 0, // 最新发表
      pageIndex: 1,
      pageSize: 15,
      type: 1,
      posts: [],
      defaultAvatar
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  async created() {
    const result = await getPosts({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      type: this.type
    });
    if (result.code === 0) {
      this.posts = result.data.posts;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.discuss_container {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  color: #333;
}
.content-left {
  width: 72%;
}
.content-right {
  width: 26%;
  margin-left: 1.5rem;
}
.discuss-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e2e2;
}
.discuss-main {
  padding: 2rem;
}
.discuss-tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
}
.tabs-item {
  &-label {
    color: #888;
    font-size: 1.3rem;
    line-height: 1.3rem;
    margin-right: 1rem;
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
  }
}
.seperate-pipe {
  margin-right: 1rem;
  color: #eee;
}
.post {
  &-list {
    li + li {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e2e2;
    }
    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  &-avatar {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  &-detail {
    width: 100%;
    margin-left: 2rem;
    font-size: 1rem;
    a {
      color: #333;
    }
    &-head {
      font-size: 1.3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &-foot {
      color: #888;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .foot-opts {
        span {
          margin: 0 0.3rem;
        }
        .opts-num {
          margin-left: 0.3rem;
        }
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
