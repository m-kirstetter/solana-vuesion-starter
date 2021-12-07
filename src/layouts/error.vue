<template>
  <div>
    <template v-if="error.statusCode === 404">
      <h1>404</h1>
      <h2>Page not found!</h2>
    </template>
    <template v-else>
      <h1>Error</h1>
      <h2>Try again later!</h2>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, useMeta } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Error',
  components: {},
  props: {
    error: { type: Object, required: true },
  },
  setup(props) {
    const { app } = useContext();
    const { title, htmlAttrs, meta } = useMeta();
    const locale = computed(() => app.i18n.locale);

    title.value = props.error.statusCode === 404 ? 'vuesion - page not found' : 'vuesion - an error occurred';

    htmlAttrs.value = {
      lang: locale.value.substr(0, 2),
    };

    meta.value = [
      {
        name: 'robots',
        content: 'NOINDEX,NOFOLLOW',
      },
    ];
  },
  head: {},
});
</script>

<style lang="scss" module>
.error {
  .message {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
