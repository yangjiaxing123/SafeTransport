import * as photosService from '../services/photos';

export default {
  namespace: 'photos',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { list } }) {
      return { ...state, list };
    },
  },
  effects: {
    *fetch({ payload: { albumId } }, { call, put }) {
      const { data } = yield call(photosService.fetch, albumId);
      const albums = yield call(photosService.fetchAlbums);

      data.forEach(element => {
        let filterred = albums.data.filter(item => item.id === element.albumId);
        if(filterred.length) {
          element.albumName = filterred[0].title;
        }
      });
      
      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.endsWith('photos')) {
          let pathArr = pathname.split('/');
          let filterred = pathArr.filter(item => !!item && !isNaN(item));
          let albumId = filterred.length ? filterred[0]: 1;
          dispatch({ type: 'fetch', payload: { albumId } });
        }
      });
    },
  },
};