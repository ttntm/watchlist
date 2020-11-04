export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      functions: {
        deleteItemTracklist: process.env.VUE_APP_F_TRACKLIST_DEL,
        deleteItemWatchlist: process.env.VUE_APP_F_WATCHLIST_DEL,
        omdbGet: process.env.VUE_APP_F_OMDB_GET,
        readTracklist: process.env.VUE_APP_F_TRACKLIST_GET,
        readWatchlist: process.env.VUE_APP_F_WATCHLIST_GET,
        tmdbGetRecs: process.env.VUE_APP_F_TMDB_GET_RECS,
        tmdbToOmdb: process.env.VUE_APP_F_TMDB_OMDB_GET,
        updateTracklist: process.env.VUE_APP_F_TRACKLIST_EDT, // only tracklist has an 'update' function; watchlist can only add/delete
        writeItemTracklist: process.env.VUE_APP_F_TRACKLIST_ADD,
        writeItemWatchlist: process.env.VUE_APP_F_WATCHLIST_ADD,
      },
      isDevEnvironment: false,
      siteURL: 'watch3r.app',
      toastMessage: null,
      windowOpen: 0
        // ENUM
        // 0 -> all closed
        // 1 -> app menu
        // 2 -> add title
        // 3 -> edit title
        // 4 -> poster
        // 5 -> add recommendation
    };
  },

  getters: {
    functions: state => state.functions,
    isDevEnvironment: state => state.isDevEnvironment,
    siteURL: state => state.siteURL,
    toastMessage: state => state.toastMessage,
    windowOpen: state => state.windowOpen,
  },

  mutations: {
    SET_DEV_ENV(state, value) {
      state.isDevEnvironment = value;
    },
    SET_SITE_URL(state, value) {
      state.siteURL = value;
    },
    SET_TOAST_MESSAGE(state, value) {
      state.toastMessage = value;
    },
    SET_WINDOW_OPEN(state, value) {
      state.windowOpen = value;
    }
  },

  actions: {
    closeAllModals({ dispatch }) {
      dispatch('toggleWindow', 0);
    },

    initialize({ dispatch }) {
      // global state reset action triggering module actions to keep things separate
      dispatch('explore/initializeExplore', null, { root: true });
      dispatch('list/initializeList', null, { root: true });
      dispatch('tools/initializeTools', null, { root: true });
      dispatch('user/initializeUser', null, { root: true });
    },

    toggleWindow({ commit }, newState) {
      commit('SET_WINDOW_OPEN', newState);
    },

    /**
    * @param {object} message - a message object as required by ToastMeassage.vue with 2 keys, "text" and "type"
    */
    sendToastMessage({ commit }, message) {
      let timer;

      clearTimeout(timer);

      commit('SET_TOAST_MESSAGE', message);

      timer = setTimeout(() => {
        commit('SET_TOAST_MESSAGE', null);
      }, 5000);
    }
  }
};
