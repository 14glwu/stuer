<template>
  <div class="footer-container">
    <p class="footer-text">
      <span class="left">合作咨询:</span>
      <span class="right">14glwu@gmail.com</span>
    </p>
    <p class="footer-text">
      <span>Copyright © STUER 2019. All Rights Reserved</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e2e2e2;
  padding: 1rem 0;
}
.footer-text {
  margin: 0.5rem 0;
  text-align: center;
  color: #999;
  .left {
    margin-right: 0.5rem;
  }
}
</style>