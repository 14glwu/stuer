import http from './http';

export async function getAllMajors() {
  const rsp = await http.get('/getAllMajors');
  return rsp.data;
}
