<template>
  <div>
    <HeaderApp />

    <RouterView></RouterView>

    <PlayerApp />

    <AuthApp />
  </div>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';
import AuthApp from './components/AuthApp.vue';
import PlayerApp from './components/Player.vue';

export default {
  name: 'App',
  components: {
    HeaderApp,
    AuthApp,
    PlayerApp,
  },

  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

