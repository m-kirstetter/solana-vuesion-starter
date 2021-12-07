import { WalletGetters } from './getters';
import { WalletDefaultState, IWalletState } from './state';

describe('WalletGetters', () => {
  let testState: IWalletState;

  beforeEach(() => {
    testState = WalletDefaultState();
  });

  test('it should get the connected boolean', () => {
    expect(WalletGetters.connected(testState)).toEqual(testState.connected);
  });
});
