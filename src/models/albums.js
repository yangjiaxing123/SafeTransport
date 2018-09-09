import * as albumsService from '../services/albums';

export default {
  namespace: 'albums',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *fetch({ payload: { } }, { call, put }) {
      const albums = yield call(albumsService.fetch);
      const users = yield call(albumsService.fetchUsers);
      albums.data.forEach(element => {
        let filterred = users.data.filter(item => item.id === element.userId);
        if(filterred.length) {
          element.userName = filterred[0].name;
        }
      });
      yield put({
        type: 'save',
        payload: {
          data: albums.data,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/albums') {
          dispatch({ type: 'fetch', payload: { } });
        }
      });
    },
  },
};