<template>
  <div id="app">
    <header class="header">
      <head-box></head-box>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import headBox from './head-box';
export default {
  data() {
    return {};
  },
  components: {
    headBox
  }
};
</script>

<style lang="scss">
@import '~@/style/variables.scss';
* {
  padding: 0;
  margin: 0;
}
html {
  font-size: 12px;
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
#app {
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 5rem 1fr 10rem;
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
  box-sizing: border-box;
  a {
    color: $primary-color;
  }
}
.content {
  grid-area: content;
  width: 100%;
  box-sizing: border-box;
}
.footer {
  grid-area: footer;
  width: 100%;
  box-sizing: border-box;
}
</style>
