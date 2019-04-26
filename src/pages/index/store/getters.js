export default {
  isLogin: (state) => state.isLogin,
  user: (state) => state.user,
  pageUser: (state) => state.pageUser,
  amI: (state) => {
    // 登录用户和页面用户是否是同一个用户，在组件中使用这个amI值可能需要使用this.$nextTick()来获得最终的amI值
    if (state.user && state.pageUser && state.user.id === state.pageUser.id) {
      return true;
    }
    return false;
  }
};
