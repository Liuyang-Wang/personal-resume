export default {
  namespaced: true,
  state: {
    appTime: Date.now()
  },
  mutations: {
    SET_APP_TIME: (state, data) => {
      state.appTime = data;
    }
  },
  actions: {
    setAppTime({ commit }, data) {
      commit('SET_APP_TIME', data);
    }
  }
};
