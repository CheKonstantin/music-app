<template>
  <header
    id="header"
    class="bg-gray-700"
  >
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link
              class="px-2 text-white"
              to="/about"
            >
              About
            </router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthApp()"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link
                class="px-2 text-white"
                to="/manage"
              >
                Manage
              </router-link>
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="signOut()"
                >Logout</a
              >
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a
              href="#"
              @click.prevent="changeLocale"
              class="px-2 text-white"
            >
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'HeaderApp',
  computed: {
    ...mapState(['userLoggedIn']),
    currentLocale() {
      return this.$i18n.locale === 'ru' ? 'Русский' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthApp']),
    signOut() {
      this.$store.dispatch('signOut', {
        router: this.$router,
        route: this.$route,
      });

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },

    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ru' ? 'en' : 'ru';
    },
  },
};
</script>

