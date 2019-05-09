import { http } from './http';

export async function getCompanies() {
  const rsp = await http.get('/companies');
  return rsp.data;
}

export async function createCompany(params) {
  const rsp = await http.post('/companies', params);
  return rsp.data;
}
