import SolanaConnect from '@/services/Solana';
import { Plugin } from '@nuxt/types';

const solana = new SolanaConnect();

declare module 'vue/types/vue' {
  // this.$solana inside Vue components
  interface Vue {
    $solana: SolanaConnect;
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$solana inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $solana: SolanaConnect;
  }
  // nuxtContext.$solana
  interface Context {
    $solana: SolanaConnect;
  }
}

declare module 'vuex/types/index' {
  // this.$solana inside Vuex stores
  // eslint-disable-next-line no-unused-vars
  interface Store<S> {
    $solana: SolanaConnect;
  }
}

const solanaPlugin: Plugin = (_context, inject) => {
  inject('solana', solana);
};

export default solanaPlugin;
