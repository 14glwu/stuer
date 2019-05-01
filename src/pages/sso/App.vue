<template>
  <div id="app">
    <main class="content_wrap">
      <div class="bg_container">
        <div class="bg_img"></div>
      </div>
      <div class="content_inner">
        <div class="header">
          <div class="logo_container">
            <a class="logo" href="/">
              <span>STUER</span>
            </a>
          </div>
          <p class="tagline">A place to share experiences and interests with stuer</p>
        </div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import '~@/style/variables.scss';
* {
  padding: 0;
  margin: 0;
}
// 配置输入框中颜色
input {
  color: $primary-color !important;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: $primary-color !important;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: $primary-color !important;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: $primary-color !important;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: $primary-color !important;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app,
.content_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bg_container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  overflow: hidden;
}

.bg_img {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
  background: url('~@/assets/background.png') no-repeat center center fixed;
}
.content_inner {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 15%;
  margin: 0 auto;
  width: 700px;
  box-shadow: 0 0 5px #888;
  border-radius: 4px;
  background: #fff;
}
.header {
  padding-top: 20px;
  border-radius: 4px 4px 0 0;
  line-height: 1.4;
  letter-spacing: 2px;
  background: $primary-color;
}
.logo_container {
  margin-bottom: 10px;
}
.logo {
  text-align: center;
  font-size: 48px;
  color: #f3f9fb;
  font-weight: bold;
  text-decoration: none;
  span {
    display: block;
    text-align: center;
  }
}
.tagline {
  text-align: center;
  font-size: 19px;
  font-weight: bold;
  font-family: 'q_serif', Georgia, Times, 'Times New Roman', 'Hiragino Kaku Gothic Pro', 'Meiryo',
    serif;
  color: #f3f9fb;
  padding-bottom: 30px;
}

.tab_head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0 0 20px 0;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  &_item {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 50%;
    height: 80px;
    line-height: 80px;
    color: $primary-color;
    background: #f3f4f5;
    cursor: pointer;
  }
}
.tab-selected {
  background: #fff;
  border-bottom: 2px solid $primary-color;
}
.tab-icon {
  width: 30px;
  height: 30px;
  vertical-align: -5px;
}
.title {
  display: inline;
  font-size: 28px;
  color: $primary-color;
}
.form_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form_item {
  width: 400px;
  .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.form_input {
  width: 400px;
}
.container {
  padding: 0 0 50px 0;
}
</style>
