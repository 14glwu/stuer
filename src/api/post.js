import http from './http';

export async function getPosts(params) {
  const rsp = await http.get('/posts', {
    params
  });
  return rsp.data;
}

export async function getPostById(id) {
  const rsp = await http.get(`/posts/${id}`);
  return rsp.data;
}

export async function updatePost(params) {
  const rsp = await http.put(`/posts/${params.id}`, params);
  return rsp.data;
}

export async function createPost(params) {
  const rsp = await http.post('/posts', params);
  return rsp.data;
}
