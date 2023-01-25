<template>
  <div>
    <HeaderApp />

    <RouterView v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component"></component>
      </transition>
    </RouterView>

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

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>

