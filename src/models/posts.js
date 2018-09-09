import * as postsService from '../services/posts';

export default {
  namespace: 'posts',
  state: {
    list: [],
    users: [],
  },
  reducers: {
    save(state, { payload: { list, users } }) {
      return { ...state, list, users };
    },
  },
  effects: {
    *fetch({ payload: { } }, { call, put }) {
      const posts = yield call(postsService.fetch);
      const users = yield call(postsService.fetchUsers);
      
      posts.data.forEach(element => {
        let filterred = users.data.filter(item => item.id === element.userId);
        if(filterred.length)
          element.userName = filterred[0].name;
      });

      yield put({
        type: 'save',
        payload: {
          list: posts.data,
          users: users.data
        },
      });
    },
    *fetchUserPosts({ payload: { userId, page = 1, limit = 10 } }, { call, put }) {
      const { data } = yield call(postsService.fetchUserPosts, { userId, page, limit });
      const user = yield call(postsService.fetchUserById, userId);
      data.forEach(element => {
        element.userName = user.data.name;
      });
      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },
    *remove({ payload: { id } }, { call, put }) {
      yield call(postsService.remove, id);
      // yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(postsService.patch, id, values);
      // yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(postsService.create, values);
      // yield put({ type: 'reload' });
    },
    *reload(action, { put }) {
      yield put({ type: 'fetch', payload: {}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query, search }) => {
        if (pathname === '/posts') {
          if (search.indexOf("userId") > -1) {
            const userId = search.split("=")[1];
            dispatch({ type: 'fetchUserPosts', payload: { userId } });
          } else {
            dispatch({ type: 'fetch', payload: { } });
          }
        }
      });
    },
  },
};