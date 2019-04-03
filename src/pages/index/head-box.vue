<template>
  <div class="header-main">
    <a href="/" class="stuer-logo" title="Stuer">STUER</a>
    <nav class="nav-main">
      <ul class="nav-list">
        <li class="main-nav-list">
          <ul class="link-list">
            <li class="link-item" v-for="(route, index) in routes" :key="index">
              <a :href="route.href" :class="getLinkClass(route.href)">{{route.name}}</a>
            </li>
          </ul>
        </li>
        <li class="nav-item search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="search"
            size="small"
            class="search-input"
          ></el-input>
        </li>
        <li class="nav-item add">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit-outline"
            @click="routeToEditor"
          >写帖子</el-button>
        </li>
        <li class="nav-item notification">
          <a href="/notification" target="_blank">
            <i class="el-icon-message"></i>
            <span class="count">{{count}}</span>
          </a>
        </li>
        <li class="nav-item menu">
          <div class="img-box" @click="showMenu=!showMenu">
            <img :src="avatar" class="avatar">
          </div>
          <ul v-if="showMenu" class="nav-menu">
            <div class="nav-menu-item"></div>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import avatar from '@/assets/logo.png';
export default {
  data() {
    return {
      search: '',
      routes: [
        {
          name: '首页',
          href: '/'
        },
        {
          name: '讨论区',
          href: '/discuss'
        },
        {
          name: '树洞',
          href: '/tree-hole'
        },
        {
          name: 'OA',
          href: '/oa'
        },
        {
          name: '求职区',
          href: '/job'
        }
      ],
      count: 6,
      avatar,
      showMenu: false
    };
  },
  methods: {
    getLinkClass(href) {
      if (this.$route.path !== '/' && href === '/') return '';
      return this.$route.path.includes(href) ? 'active' : '';
    },
    routeToEditor() {
      this.$router.push('editor');
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.header-main {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 960px;
  height: 5rem;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
}
.stuer-logo {
  display: block;
  width: 12rem;
  height: 5rem;
  line-height: 5rem;
  font-size: 3.5rem;
  margin-right: 2rem;
}
.nav-main {
  height: 100%;
  flex: 1 0 auto;
}
.nav-list {
  display: flex;
  justify-content: flex-end;
  height: 5rem;
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  font-size: 1.33rem;
  color: $link-color;
  padding: 0 1rem;
  &.search {
    flex: 1 1 auto;
    justify-content: flex-end;
    cursor: auto;
  }
}

.main-nav-list {
  display: flex;
}
.link-list {
  display: flex;
}
.link-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  a {
    display: block;
    height: 5rem;
    line-height: 5rem;
    font-size: 1.33rem;
    font-weight: bold;
    color: $link-color;
    padding: 0 1rem;
    &:hover {
      color: $primary-color;
    }
    &.active {
      color: $primary-color;
    }
  }
}
.search-input {
  width: 12rem;
}
.notification {
  position: relative;
  font-size: 2rem;
  a {
    color: $primary-color;
  }
  .count {
    position: absolute;
    left: 50%;
    bottom: 50%;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    line-height: 1;
    text-align: center;
    color: #fff;
    background-color: $primary-color;
    border-radius: 3rem;
    border: 2px solid #fff;
    word-break: normal;
  }
}
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
  background: #eee;
  cursor: pointer;
  .avatar {
    height: 3rem;
    width: 3rem;
  }
}
</style>
