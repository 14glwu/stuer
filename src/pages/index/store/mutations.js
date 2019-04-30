export default {
  loginStatus(state, payload) {
    state.isLogin = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setPageUser(state, payload) {
    state.pageUser = payload;
  },
  setAmI(state, payload) {
    state.amI = payload;
  }
};
