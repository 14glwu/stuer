<template>
  <div id="app" class="page">
    <header class="header">
      <head-box></head-box>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
    <footer class="footer">
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
a {
  text-decoration: none;
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
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
html {
  color: #333;
  background-color: #f4f5f5;
}
.page {
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 5rem 1fr 7rem;
  grid-template-columns: 1fr;
}
.header {
  position: fixed;
  grid-area: header;
  width: 100%;
  height: 5rem;
  z-index: 1000;
  background: #fff;
  color: #909090;
  border-bottom: 1px solid #f1f1f1;
  a {
    color: $link-color;
  }
}
.content {
  grid-area: content;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.content-normal {
  max-width: 960px;
}
.footer {
  grid-area: footer;
  width: 100%;
}
.block {
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background: #fff;
}
</style>
