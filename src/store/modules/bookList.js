import API from 'API';

import { handleError } from '../utils/handles';

export default {
  namespaced: true,
  state: {
    books: [],
    totalCount: 0,
    noMoreData: false
  },
  mutations: {
    UPDATE_BOOKS_BASE_INFO(state, datas) {
      // 记录已有的图书数量
      state.totalCount += datas.results.length;
      state.books = datas.results;
      // 判断是否还有更多
      state.noMoreData = state.totalCount >= datas.count;
    },
    CLAER_BOOKS_BASE_INFO(state) {
      console.log('clear books');
      state.books = [];
      state.totalCount = 0;
      state.noMoreData = false;
    }
  },
  actions: {
    // 获取图书列表信息
    GET_BOOKS_BASE_INFO({state, commit}, {params, reset}) {
      return new Promise((resolve, reject) => {
        API.getBookBaseInfo(params).then((response) => {
          // 更新图书
          if (reset) {
            // 如果是重置，则先删除原有数据
            commit('CLAER_BOOKS_BASE_INFO');
          }
          commit('UPDATE_BOOKS_BASE_INFO', response.data);
          commit('UPDATE_DOCUMENT_TITLE', '图书列表', { root: true });
          commit('UPDATE_DOCUMENT_DESCRIPTION', '图书列表', { root: true });
          commit('UPDATE_DOCUMENT_KEYWORDS', '图书列表', { root: true });
          resolve(response);
        }).catch((error) => {
          handleError(error);
          reject(error);
        });
      });
    }
  }
};
