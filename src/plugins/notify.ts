import { Plugin } from '@nuxt/types';
import { notification } from 'ant-design-vue';
import { NuxtNotifyInstance } from '@/interfaces/INotify';

const notify = notification;

notify.config({
  placement: 'bottomRight',
  bottom: '10px',
  duration: 8,
});

declare module 'vue/types/vue' {
  // this.$notify inside Vue components
  interface Vue {
    $notify: NuxtNotifyInstance;
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$notify inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $notify: NuxtNotifyInstance;
  }
  // nuxtContext.$notify
  interface Context {
    $notify: NuxtNotifyInstance;
  }
}

declare module 'vuex/types/index' {
  // this.$notify inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  interface Store<S> {
    $notify: NuxtNotifyInstance;
  }
}

const notifyPlugin: Plugin = (_context, inject) => {
  inject('notify', notify);
};

export default notifyPlugin;
