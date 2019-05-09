import { http } from './http';

// 登录
export async function login(params) {
  const rsp = await http.post('/login', params);
  return rsp.data;
}

// 登录
export async function logout() {
  const rsp = await http.get('/logout');
  return rsp.data;
}

// 注册
export async function signup(params) {
  const rsp = await http.post('/signup', params);
  return rsp.data;
}

// 发送验证码
export async function sendCode(params) {
  const rsp = await http.post('/sendCode', params);
  return rsp.data;
}

// 验证验证码，用于改密码时
export async function validateCode(params) {
  const rsp = await http.post('/validateCode', params);
  return rsp.data;
}

// 更新密码
export async function updatePwd(params) {
  const rsp = await http.post('/updatePwd', params);
  return rsp.data;
}

// 获取用户登录状态
export async function getLoginStatus() {
  const rsp = await http.get('/loginStatus');
  return rsp.data;
}
