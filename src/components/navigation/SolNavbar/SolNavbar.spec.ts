import { render, RenderResult } from '@testing-library/vue';
import Vuex, { Store } from 'vuex';
import { WalletDefaultState, IWalletState } from '@/store/wallet/state';
import { WalletActions } from '@/store/wallet/actions';
import { WalletGetters } from '@/store/wallet/getters';
import { WalletMutations } from '@/store/wallet/mutations';
import { notification } from 'ant-design-vue';
import SolNavbar from './SolNavbar.vue';

describe('SolNavbar.vue', () => {
  let store: Store<IWalletState>;
  let $notify: typeof notification;
  let harness: RenderResult;

  const initialize = jest.fn();

  const walletsFixture = {
    Phantom: {
      website: 'https://phantom.app',
      chromeUrl: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
      getAdapter() {
        return 'string';
      },
    },
  };

  const WalletModule = {
    namespaced: true,
    state: () => WalletDefaultState(),
    mutations: WalletMutations,
    actions: WalletActions,
    getters: WalletGetters,
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        wallet: WalletModule,
      },
    } as any);

    $notify = notification;
    $notify.config({
      placement: 'bottomRight',
      bottom: '10px',
      duration: 8,
    });

    harness = render(SolNavbar, {
      stubs: ['nuxt-link'],
      mocks: {
        $nuxt: {
          context: {
            store,
            $notify,
            $solana: {
              wallets: walletsFixture,
              initialize,
            },
          },
        },
        $solana: {
          wallets: walletsFixture,
          initialize,
        },
        $store: store,
      },
    });
  });

  test('renders component', () => {
    const { getAllByTestId } = harness;

    getAllByTestId('sol-navbar');
  });
});
