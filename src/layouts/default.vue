<template>
  <div id="app" :class="$style.app">
    <Layout>
      <SolNavbar />
      <LayoutContent :style="{ padding: '0 50px', marginTop: '64px' }">
        <nuxt :class="$style.content" />
      </LayoutContent>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useContext, useMeta, watch } from '@nuxtjs/composition-api';
import { useLocaleSwitch } from '@/composables/use-locale-switch';
import { IItem } from '@/interfaces/IItem';
import SolNavbar from '@/components/navigation/SolNavbar/SolNavbar.vue';
import { Layout } from 'ant-design-vue';

const LayoutContent = Layout.Content;

export default defineComponent({
  name: 'App',
  components: { SolNavbar, Layout, LayoutContent },
  setup() {
    const { app } = useContext();
    const { htmlAttrs } = useMeta();
    const { switchLocaleTo } = useLocaleSwitch(app.i18n);
    const languages = computed(() => [
      { label: 'English', value: 'en' },
      { label: 'Deutsch', value: 'de' },
    ]);
    const themes = computed(() => [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]);
    const locale = computed(() => app.i18n.locale);
    const onLocaleSwitch = (selectedLocale: IItem) => switchLocaleTo(selectedLocale.value);

    watch(
      [locale],
      () => {
        htmlAttrs.value = {
          lang: locale.value.substr(0, 2),
        };
      },
      { immediate: true },
    );

    return {
      languages,
      themes,
      locale,
      onLocaleSwitch,
    };
  },
  head: {},
});
</script>

<style lang="scss" module>
.app {
  .main {
    .contentWrapper {
      margin: 24px 16px 0;
      overflow: initial;

      .content {
        flex: 1;
        padding: 24px;
        background: #fff;
        text-align: center;
      }
    }

    .footer {
      text-align: center;
    }
  }
}
</style>
