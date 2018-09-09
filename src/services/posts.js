import request from '../utils/request';

export function fetch() {
  return request(`/api/posts`);
}

export function fetchUsers() {
  return request(`/api/users`);
}

export function fetchUserById(id) {
  return request(`/api/users/${id}`);
}

export function fetchUserPosts({ userId, page, limit }) {
  return request(`/api/posts?userId=${userId}&_page=${page}&_limit=${limit}`);
}

export function remove(id) {
  return request(`/api/posts/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/posts', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}