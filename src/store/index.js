import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    showAuthApp: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthApp: (state) => {
      state.showAuthApp = !state.showAuthApp;
    },

    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },

  getters: {
    showAuthApp: (state) => state.showAuthApp,
  },

  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });
      commit('toggleAuth');
    },

    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
  },
});
