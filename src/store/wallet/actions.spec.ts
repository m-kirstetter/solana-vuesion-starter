import Vuex, { Store } from 'vuex';
import { WalletDefaultState } from '@/store/wallet/state';
import { IState } from '@/interfaces/IState';
import { WalletActions } from '@/store/wallet/actions';
import { WalletMutations } from '@/store/wallet/mutations';
import { WalletGetters } from '@/store/wallet/getters';

describe('WalletActions', () => {
  let store: Store<IState>;
  let connectFixture: { address: string; name: string };

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

    store.commit = jest.fn();

    connectFixture = { address: 'address', name: 'test' };
  });

  describe('connection', () => {
    test('it should call SET_CONNECTED, SET_NAME and SET_ADDRESS', () => {
      store.dispatch('wallet/connect', connectFixture);

      expect(store.commit).toHaveBeenCalledTimes(3);
      expect(store.commit).toHaveBeenNthCalledWith(1, 'wallet/SET_CONNECTED', true, undefined);
      expect(store.commit).toHaveBeenNthCalledWith(2, 'wallet/SET_NAME', connectFixture.name, undefined);
      expect(store.commit).toHaveBeenNthCalledWith(3, 'wallet/SET_ADDRESS', connectFixture.address, undefined);
    });

    test('it should call SET_CONNECTED, SET_NAME and SET_ADDRESS', () => {
      store.dispatch('wallet/disconnect');

      expect(store.commit).toHaveBeenCalledTimes(3);
      expect(store.commit).toHaveBeenNthCalledWith(1, 'wallet/SET_CONNECTED', false, undefined);
      expect(store.commit).toHaveBeenNthCalledWith(2, 'wallet/SET_NAME', '', undefined);
      expect(store.commit).toHaveBeenNthCalledWith(3, 'wallet/SET_ADDRESS', '', undefined);
    });
  });
});
