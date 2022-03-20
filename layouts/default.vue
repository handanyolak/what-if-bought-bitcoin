<template>
  <v-app>
    <div class="layout-default bg-dark-gray">
      <div class="items-center justify-between p-5 md:flex">
        <nuxt-link to="/">
          <img
            alt="What If Bought Bitcoin"
            class="md:max-w-sm md:p-10"
            src="~/assets/images/logo.svg"
          />
        </nuxt-link>
        <div>
          <div v-if="route.name !== 'support-me'" class="flex justify-center">
            <nuxt-link
              class="button relative m-5 flex h-10 w-64 cursor-pointer justify-center rounded-md text-center text-xl font-bold text-white transition-colors duration-700 before:absolute before:bottom-[6px] before:h-[2px] before:w-full before:rounded-lg after:absolute after:bottom-3 after:h-2/5 hover:text-dark-pink"
              to="/support-me"
            >
              Support Me With Crypto
            </nuxt-link>
          </div>
        </div>
      </div>
      <Nuxt />
    </div>
  </v-app>
</template>

<script setup>
  import { useRoute } from '@nuxtjs/composition-api'
  const route = useRoute()
</script>

<style scoped>
  .layout-default {
    background-image: url('~/assets/images/backgroundImage.svg'),
      url('~/assets/images/backgroundImage.svg');
    background-position: 0% 0%, 100% 100%;
  }

  @property --rotate {
    syntax: '<angle>';
    initial-value: 132deg;
    inherits: false;
  }

  .button:hover:before,
  .button:hover:after {
    animation: none;
    opacity: 0;
  }

  .button::before {
    background-image: linear-gradient(
      var(--rotate),
      #da12cc,
      #f13d7d 43%,
      #eed11d
    );

    animation: spin 2.5s linear infinite;
  }

  .button::after {
    width: 140%;
    transform: scale(0.8);
    filter: blur(calc(180px / 6));
    background-image: linear-gradient(
      var(--rotate),
      #da12cc,
      #f13d7d 43%,
      #eed11d
    );
    transition: opacity 0.5s;
    animation: spin 2.5s linear infinite;
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
</style>
