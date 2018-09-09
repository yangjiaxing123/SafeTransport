import request from '../utils/request';

export function fetch() {
  return request(`/api/albums`);
}

export function fetchUsers() {
  return request(`/api/users`);
}