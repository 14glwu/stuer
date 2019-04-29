import http from './http';

export async function getPosts(params) {
  const rsp = await http.get('/posts', {
    params
  });
  return rsp.data;
}
