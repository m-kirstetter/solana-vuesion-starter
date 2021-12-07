<template>
  <LayoutHeader data-testid="sol-navbar" :class="$style.navbar">
    <div :class="$style.logo" />
    <Row type="flex">
      <Menu theme="dark" mode="horizontal" :default-selected-keys="['1']" :class="$style.menu">
        <MenuItem key="1"> <nuxt-link to="/">Home</nuxt-link> </MenuItem>
      </Menu>
      <SolWallet :class="$style.wallet" />
    </Row>
  </LayoutHeader>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SolWallet from '@/components/SolWallet/SolWallet.vue';
import { Layout, Row, Menu } from 'ant-design-vue';

const LayoutHeader = Layout.Header;
const MenuItem = Menu.Item;

export default defineComponent({
  name: 'SolNavbar',
  components: {
    SolWallet,
    LayoutHeader,
    Row,
    Menu,
    MenuItem,
  },
  props: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" module>
@import '../../../assets/scss/_variables';

.navbar {
  position: fixed;
  z-index: 1;
  width: 100%;

  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }

  .wallet {
    margin-left: auto;
    float: right;
  }

  .menu {
    line-height: $navbar-height;
  }
}
</style>
