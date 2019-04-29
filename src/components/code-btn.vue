<template>
  <el-button type="primary" :disabled="isDisabled" @click="sendCodeClick">{{btnName}}</el-button>
</template>

<script>
export default {
  data() {
    return {
      btnName: '获取验证码',
      isDisabled: false,
      time: 60
    };
  },
  methods: {
    sendCodeClick() {
      const time = this.time; // this.time值在定时器内部访问不了
      const self = this;
      self.isDisabled = true;
      const interval = setInterval(function() {
        self.btnName = `(${self.time}秒）后重新获取`;
        --self.time;
        if (self.time < 0) {
          self.btnName = '获取验证码';
          self.time = time;
          self.isDisabled = false;
          clearInterval(interval);
        }
      }, 1000);
      this.$emit('send-code');
    }
  }
};
</script>

<style scoped lang="scss"></style>
