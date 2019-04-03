<template>
  <div id="app" :class="{'page': true, 'page-no-header-footer': !showHeaderFooter}">
    <header class="header" v-if="showHeaderFooter">
      <head-box></head-box>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
    <footer class="footer" v-if="showHeaderFooter">
      <foot-box></foot-box>
    </footer>
  </div>
</template>

<script>
import headBox from './head-box';
import footBox from './foot-box';
export default {
  data() {
    return {};
  },
  components: {
    headBox,
    footBox
  },
  computed: {
    showHeaderFooter() {
      console.log(this.$route);
      if (/^\/editor.*/.test(this.$route.path)) {
        //路由为发帖时隐藏头部
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
@import '~@/style/variables.scss';
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul,
ol,
li {
  list-style: none;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
  display: block;
}
html {
  font-size: 12px;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.page {
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 5rem 1fr 10rem;
  grid-template-columns: 1fr;
}
.page-no-header-footer {
  display: grid;
  grid-template-areas: 'content';
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}
.header {
  position: fixed;
  grid-area: header;
  width: 100%;
  height: 5rem;
  z-index: 250;
  background: #fff;
  color: #909090;
  border-bottom: 1px solid #f1f1f1;
  a {
    color: $primary-color;
  }
}
.content {
  grid-area: content;
  width: 100%;
}
.footer {
  grid-area: footer;
  width: 100%;
}
</style>
