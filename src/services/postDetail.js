import request from '../utils/request';

export function getPost(id) {
  return request(`/api/posts/${id}`);
}

export function fetchUsers() {
  return request(`/api/users`);
}

export function getPostComments(id) {
  return request(`/api/posts/${id}/comments`);
}

export function remove(id) {
  return request(`/api/comments/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/comments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/comments', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}