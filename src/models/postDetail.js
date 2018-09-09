import * as postDetailService from '../services/postDetail';

export default {
  namespace: 'postDetail',
  state: {
    post: null,
    comments: [],
  },
  reducers: {
    save(state, { payload: { post, comments } }) {
      return { ...state, post, comments };
    },
  },
  effects: {
    *getPost({ payload: { id } }, { call, put }) {
      const post = yield call(postDetailService.getPost, id);
      const comments = yield call(postDetailService.getPostComments, id);
      const users = yield call(postDetailService.fetchUsers);

      let filterred = users.data.filter(item => item.id === post.data.userId);
      if(filterred.length)
        post.data.userName = filterred[0].name;

      yield put({
        type: 'save',
        payload: {
          post: post.data,
          comments: comments.data
        },
      });
    },
    
    *remove({ payload: id }, { call, put }) {
      yield call(postDetailService.remove, id);
      // yield put({ type: 'reload' });
    },

    *patch({ payload: values }, { call, put }) {
      const { id } = values;
      delete values['id'];
      yield call(postDetailService.patch, id, values);
      // yield put({ type: 'reload' });
    },

    *create({ payload: values }, { call, put, select }) {
      yield call(postDetailService.create, values);
    },
    *reload({ payload: id }, { put }) {
      yield put({ type: 'getPost', payload: { id }});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
          if (pathname.indexOf('/posts/') > -1) {
            let pathArr = pathname.split('/');
            let id = pathArr.slice(-1)[0];
            if(id < 0) {
              window.location.href = '#notfound';
            } else {
              dispatch({ type: 'getPost', payload: { id } });
            }
        }
      });
    },
  },
};