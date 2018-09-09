import request from '../utils/request';

export function fetch({ page, limit }) {
  return request(`/api/users?_page=${page}&_limit=${limit}`);
}