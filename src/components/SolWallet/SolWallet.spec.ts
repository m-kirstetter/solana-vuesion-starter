import { fireEvent, render, RenderResult } from '@testing-library/vue';
import Vuex, { Store } from 'vuex';
import { WalletDefaultState, IWalletState } from '@/store/wallet/state';
import { WalletActions } from '@/store/wallet/actions';
import { WalletGetters } from '@/store/wallet/getters';
import { WalletMutations } from '@/store/wallet/mutations';
import { notification } from 'ant-design-vue';
import SolWallet from './SolWallet.vue';

describe('SolWallet.vue', () => {
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

  WalletModule.mutations.SET_NAME(WalletModule.state(), 'Phantom');

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

    store.dispatch = jest.fn();
    process.client = true;

    harness = render(SolWallet, {
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

    getAllByTestId('sol-wallet');
  });

  test('initialize is not called when wallet name is not in store', () => {
    expect(initialize).not.toHaveBeenCalled();
  });

  test('modal opens on connect button clic', async () => {
    const { getByText } = harness;

    const button = getByText('Connect');

    await fireEvent.click(button);

    getByText('Connect to a wallet');
  });

  test('calls onConnect on Phantom wallet button clic', async () => {
    const { getByText } = harness;

    const button = getByText('Connect');

    await fireEvent.click(button);

    const connect = getByText('Phantom');

    fireEvent.click(connect);

    expect(initialize).toHaveBeenCalled();
  });
});
