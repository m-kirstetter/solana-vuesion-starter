<template>
  <div data-testid="sol-wallet">
    <Button v-if="!$store.state.wallet.connected" :loading="isLoading" ghost @click="isOpen = !isOpen">
      <Icon v-if="!isLoading" type="wallet" />
      Connect
    </Button>
    <Button v-else ghost :loading="isLoading" @click="isOpen = !isOpen">
      <Icon v-if="!isLoading" type="wallet" />
      {{ $store.state.wallet.address.substr(0, 4) }}
      ...
      {{ $store.state.wallet.address.substr($store.state.wallet.address.length - 4, 4) }}
    </Button>

    <Modal
      :title="!$store.state.wallet.connected ? 'Connect to a wallet' : 'Your wallet'"
      :visible="isOpen"
      :footer="null"
      centered
      @cancel="isOpen = !isOpen"
    >
      <div v-if="!$store.state.wallet.connected" :class="$style.selectWallet">
        <Button v-for="(info, name) in $solana.wallets" :key="name" type="primary" @click="onConnect(name, info)">
          <span>{{ name }}</span>
          <img :src="icons(`/wallets/${name.replace(' ', '-').toLowerCase()}.png`)" />
        </Button>
      </div>
      <div v-else :class="$style.walletInfo">
        <p class="address">{{ $store.state.wallet.address }}</p>

        <Button ghost type="danger" @click="onDisconnect"> DISCONNECT </Button>
      </div>
    </Modal>
    <!-- <Modal
      :title="!wallet.connected ? 'Connect to a wallet' : 'Your wallet'"
      :visible="wallet.modalShow"
      :footer="null"
      centered
      @cancel="$accessor.wallet.closeModal"
    >
      <div v-if="!wallet.connected" class="select-wallet">
        <Button v-for="(info, name) in wallets" :key="name" ghost @click="connect(name, info)">
          <span>{{ name }}</span>
          <img :src="importIcon(`/wallets/${name.replace(' ', '-').toLowerCase()}.png`)" />
        </Button>
      </div>
      <div v-else class="wallet-info">
        <p class="address" @click="debug">{{ wallet.address }}</p>

        <Button ghost @click="disconnect"> DISCONNECT </Button>

        <div v-if="historyList.length" class="tx-history-panel">
          <h2>Recent Transactions</h2>
          <div v-for="txInfo in historyList" :key="txInfo.txid" class="tx-item">
            <div class="extra-info">
              <Icon
                v-if="txInfo.status === 'success'"
                class="icon"
                type="check-circle"
                :style="{ color: '#52c41a' }"
              />
              <Icon
                v-else-if="txInfo.status === 'fail'"
                class="icon"
                type="close-circle"
                :style="{ color: '#fa8c16' }"
              />
              <Icon v-else-if="txInfo.status === 'droped'" class="icon" type="delete" :style="{ color: '#f5222d' }" />
              <Icon v-else class="icon" type="loading" :style="{ color: '#1890ff' }" />
              <a :href="`${$accessor.url.explorer}/tx/${txInfo.txid}`" target="_blank">{{
                txInfo.description || txInfo.d /* old data polyfill*/
              }}</a>
            </div>
            <div class="extra-info time">{{ $dayjs(txInfo.time || txInfo.t /* old data polyfill*/) }}</div>
          </div>
        </div>
      </div>
    </Modal> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import { useContext } from '@nuxtjs/composition-api';
import { WalletInfo } from '@/services/Solana';
import importIcon from '@/utils/import-icon';
import { sleep } from '@/utils/index';
import { Button, Icon, Modal } from 'ant-design-vue';

export default defineComponent({
  name: 'SolWallet',
  components: {
    Button,
    Icon,
    Modal,
  },
  props: {},
  setup() {
    const { store, $solana, $notify } = useContext();
    const isOpen = ref(false);
    const isLoading = ref(false);
    const icons = importIcon;

    onMounted(() => {
      /* istanbul ignore next */
      if (process.client) window.onload = () => autoConnect();
    });

    /* istanbul ignore next */
    const autoConnect = async () => {
      const name = store.state.wallet.name;

      if (name.length > 1 && !$solana.adapter) {
        const info = $solana.wallets[name];
        if (info) await onConnect(name, info);
      }
    };

    /* istanbul ignore next */
    const onConnect = async (name: string, info: WalletInfo) => {
      isLoading.value = true;

      try {
        await $solana.initialize(name, info);
        isOpen.value = false;
        await sleep(1000);

        store.dispatch('wallet/connect', { address: $solana.getAddress(), name });

        $notify.success({
          message: 'Wallet connected',
          description: `Connected to ${name}`,
        });
      } catch (error) {
        isOpen.value = false;
        $notify.error({
          message: 'Error',
          description: error.message,
        });
      }

      isLoading.value = false;
    };

    /* istanbul ignore next */
    const onDisconnect = async () => {
      isLoading.value = true;

      isOpen.value = false;
      await sleep(1000);

      try {
        await $solana.disconnect();
      } catch (error) {}

      store.dispatch('wallet/disconnect');

      $notify.warning({
        message: 'Wallet disconnected',
        description: '',
      });

      isLoading.value = false;
    };

    return { isOpen, isLoading, icons, onConnect, onDisconnect };
  },
});
</script>

<style lang="scss" module>
.selectWallet {
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    width: 100%;
    height: 48px;
    text-align: left;

    img {
      height: 32px;
      width: 32px;
      border-radius: 50%;
    }
  }

  button:not(:first-child) {
    margin-top: 10px;
  }
}
.walletInfo {
  text-align: center;

  .address {
    font-size: 17px;
  }
}
</style>
