<template>
  <div class="home-wrap">
    <div class="block">
      <!-- swiper -->
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img :src="slide" alt="轮播图">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="modules block">
      <div class="modules-head">
        <h1 class="modules-title block-title">推荐模块</h1>
      </div>
      <div class="modules-content">
        <ul class="mod-list">
          <li v-for="(mod, index) in modules" :key="index" class="mod-list-item">
            <router-link :to="mod.href" class="mod-box">
              <svg class="icon mod-icon" aria-hidden="true">
                <use :xlink:href="`#icon-${mod.icon}`"></use>
              </svg>
              <div class="mod-name">{{mod.name}}</div>
              <div class="mod-mask">
                <div class="mod-mask-item"></div>
                <div class="mod-mask-text" v-html="mod.desc"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="modules block">
      <div class="modules-head">
        <h1 class="modules-title block-title">推荐帖子</h1>
      </div>
      <div class="modules-content">
        <ul class="post-list">
          <li class="post-list-item" v-for="(post, index) in posts" :key="index">
            <router-link :to="`/profile/${post.userId}`">
              <img :src="post.userInfo.avatar || defaultAvatar" alt="用户头像" class="post-avatar">
            </router-link>
            <div class="post-detail">
              <div class="post-detail-head">
                <router-link :to="`/posts/${post.id}`" target="_blank">{{post.title}}</router-link>
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
                <ul class="foot-opts">
                  <li v-for="(label,index)  in legendOpts " :key="index">
                    <span>{{ label }}</span>
                    <span class="opts-num">{{ parseInt((Math.random()+"").slice(2,4),10) }}</span>
                    <span class="seperate-pipe" v-if="!(index === legendOpts.length - 1)">|</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import defaultAvatar from '@/assets/default-avatar.png';

import { getPosts } from '@/api';
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        grabCursor: true
      },
      swiperSlides: [
        'http://pr87jmetw.bkt.clouddn.com/img/banner/banner1.jpg',
        'http://pr87jmetw.bkt.clouddn.com/img/banner/banner2.jpg',
        'http://pr87jmetw.bkt.clouddn.com/img/banner/banner3.jpg'
      ],
      modules: [
        {
          name: '讨论区',
          desc: '和大家交流<br>你的兴趣爱好吧',
          href: '/discuss',
          icon: 'discuss1'
        },
        {
          name: '树洞',
          desc: '将悄悄话<br>都丢进树洞吧',
          href: '/tree-hole',
          icon: 'niming'
        },
        {
          name: '找对象',
          desc: '找到你<br>心中的那个ta',
          href: '/find-love',
          icon: 'findLove'
        },
        {
          name: '求职区',
          desc: '相信你能在这里<br>求得一份好工作',
          href: '/job',
          icon: 'job'
        },
        {
          name: '办工自动化',
          desc: '来来来，浏览下<br>学校的最新资讯',
          href: '/oa',
          icon: 'oa'
        }
      ],
      pageIndex: 1, // 页码
      pageSize: 10, // 页面大小
      total: 0, // 数据总量
      type: 1, // 帖子类型，即发表区域
      order: 4, // 排序方式，1最新发表，2最新回复，3热门贴，4精华帖 （后两个不适用于树洞、求职区）
      posts: [],
      legendOpts: ['点赞', '评论', '浏览'],
      defaultAvatar
    };
  },
  async created() {
    await this.getPostsData();
  },
  methods: {
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

<style lang="scss">
@import '~@/style/variables.scss';
.home-wrap {
  padding: 1rem 0;
}
.swiper {
  width: 100%;
  height: 30rem;
}
.swiper-pagination-bullet {
  background: #fff;
  opacity: 0.6;
  &-active {
    opacity: 1;
    background: $primary-color;
  }
}
.modules {
  margin-top: 1rem;
  &-head {
    padding: 1rem;
    border-bottom: 1px solid #e2e2e2;
  }
  &-title {
    font-size: 1.6rem;
  }
  &-content {
    padding: 2rem;
  }
}
.mod {
  &-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-item {
      position: relative;
      width: 12rem;
      height: 12rem;
      padding: 1rem;
      &:hover {
        .mod-mask {
          display: block;
        }
      }
    }
  }
  &-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &-name {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: #333;
  }
  &-icon {
    width: 6rem;
    height: 6rem;
  }
  &-mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    &-item {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.6);
    }
    &-text {
      position: absolute;
      left: 0;
      top: 2rem;
      right: 0;
      bottom: 0;
      color: #fff;
      font-size: 1.2rem;
      z-index: 10;
      padding: 1rem;
      text-align: center;
      line-height: 1.8;
    }
  }
}
.post {
  &-list {
    margin-bottom: 2rem;
    &-item + &-item {
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
        display: flex;
        align-items: center;
        .opts-num {
          margin-left: 0.5rem;
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

.seperate-pipe {
  margin: 0 1em;
  color: #eee;
}
</style>
