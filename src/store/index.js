import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
import { Howl } from 'howler';

export default createStore({
  state: {
    showAuthApp: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
  },
  mutations: {
    toggleAuthApp: (state) => {
      state.showAuthApp = !state.showAuthApp;
    },

    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },

    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
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

    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },

    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },

    async signOut({ commit }, payload) {
      await auth.signOut();
      commit('toggleAuth');

      if (payload.route.meta.requiresAuth) {
        payload.router.push({ name: 'home' });
      }
    },

    async newSong({ commit, state }, payload) {
      commit('newSong', payload);

      state.sound.play();
    },
  },
});

