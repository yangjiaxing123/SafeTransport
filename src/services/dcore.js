import request from '../utils/request';

export function postRequest(values) {
    return request('/dcore', {
      method: 'POST',
      body: JSON.stringify(values),
    });
}