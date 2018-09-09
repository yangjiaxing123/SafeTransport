import request from '../utils/request';

export function fetch(albumId) {
  return request(`/api/albums/${albumId}/photos`);
}

export function fetchAlbums() {
  return request(`/api/albums`);
}