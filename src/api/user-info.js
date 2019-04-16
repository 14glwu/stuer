import http from './http';

// 登录
export async function getUserInfo() {
  const rsp = await http.get('/getUserInfo');
  return rsp.data;
}

export async function getUserInfoById(id) {
  const rsp = await http.get(`/user/${id}`);
  return rsp.data;
}
