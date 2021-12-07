<template>
  <Row type="flex" align="middle" :class="$style.homePage">
    <Col :flex="1">
      <h1>Solana Starter</h1>
    </Col>
  </Row>
</template>

<script lang="ts">
/* istanbul ignore file */
import { defineComponent } from '@nuxtjs/composition-api';
import { Row, Col } from 'ant-design-vue';

export default defineComponent({
  name: 'HomePage',
  auth: false,
  components: {
    Row,
    Col,
  },
  setup() {
    return {};
  },
  head() {
    const url = 'https://vuesion.herokuapp.com/';
    const logo = '/images/vuesion-logo.png';
    const title = 'Vuesion - The boilerplate for product teams';
    const description =
      'Vuesion is a boilerplate that helps product teams build faster than ever with fewer headaches and modern best practices across engineering & design.';

    return {
      title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          name: 'robots',
          content: 'INDEX,FOLLOW',
        },
        {
          name: 'keywords',
          content:
            'vue.js, vuex, vuex-persist, nuxt.js, seo, server-side-rendering, progressive-web-app, design-system, best practices',
        },

        { name: 'og:url', content: url },
        { name: 'og:site_name', content: 'vuesion' },
        { name: 'og:type', content: 'website' },
        { name: 'og:locale', content: 'en' },
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:description',
          content: description,
        },
        { name: 'og:image:url', content: logo },

        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@vuesion1' },
        { name: 'twitter:creator', content: '@vuesion1' },
        {
          name: 'twitter:title',
          content: title,
        },
        { name: 'twitter:url', content: url },
        { name: 'twitter:image', content: logo },
        {
          name: 'twitter:description',
          content: description,
        },
      ],
    };
  },
});
</script>

<style lang="scss" module>
@import '../assets/scss/_variables';

.homePage {
  height: calc(100vh - #{$navbar-height});
  text-align: center;
}
</style>
