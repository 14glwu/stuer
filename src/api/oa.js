import { http2 } from './http';

export async function getOas(params) {
  const rsp = await http2.get('/oas', {
    params
  });
  return rsp.data;
}

export async function getOaById(id) {
  const rsp = await http2.get(`/oas/${id}`);
  return rsp.data;
}
