import * as usersService from '../services/users';
import * as dcoreService from '../services/dcore';

export default {
  namespace: 'users',
  state: {
    list: [],
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, page } }) {
      return { ...state, list, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, limit = 10 } }, { call, put }) {
      const { data } = yield call(usersService.fetch, { page, limit });
      
        console.log("11111111111")
        console.log(data)
        
        for (let x in data) {
          console.log(data[x])
          const dcoredata =  yield call(dcoreService.postRequest, 
            { "method": "list_account_balances", "params": [data[x].name, ""], "id": 8 });
            console.log(dcoredata)
            data[x].balance = dcoredata.data.result[0].amount/10000000;
        }
      yield put({
        type: 'save',
        payload: {
          data,
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: { } });
        }
      });
    },
  },
};