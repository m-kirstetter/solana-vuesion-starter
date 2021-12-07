import { PublicKey } from '@solana/web3.js';
import { WalletMutations } from './mutations';
import { WalletDefaultState, IWalletState } from './state';

describe('WalletMutations', () => {
  let testState: IWalletState;

  beforeEach(() => {
    testState = WalletDefaultState();
  });

  test('it should set connected', () => {
    const expected = true;

    WalletMutations.SET_CONNECTED(testState, expected);
    expect(testState.connected).toEqual(expected);
  });

  test('it should set address', () => {
    const expected = 'HPx9TD5Le9VMGXBXoXZwjDVsTPK1g86gr7zYtGUmyYdm';

    WalletMutations.SET_ADDRESS(testState, expected);
    expect(testState.address).toEqual(expected);
  });

  test('it should set name', () => {
    const expected = 'Phantom';

    WalletMutations.SET_NAME(testState, expected);
    expect(testState.name).toEqual(expected);
  });

  test('it should set initialized', () => {
    WalletMutations.SET_INITIALIZED(testState);
    expect(testState.initialized).toEqual(true);
  });

  test('it should set loading true', () => {
    const expected = true;

    WalletMutations.SET_LOADING(testState, expected);
    expect(testState.loading).toEqual(expected);
  });

  test('it should set loading false', () => {
    const expected = false;

    WalletMutations.SET_LOADING(testState, expected);
    expect(testState.loading).toEqual(expected);
    expect(testState.countdown).toEqual(0);
  });

  test('it should set tokenAccounts', () => {
    const expected = { token: 'string' };

    WalletMutations.SET_TOKEN_ACCOUNTS(testState, expected);
    expect(testState.tokenAccounts).toEqual(expected);
  });

  test('it should set tokenAccounts', () => {
    const expected = [
      {
        pubkey: ('HPx9TD5Le9VMGXBXoXZwjDVsTPK1g86gr7zYtGUmyYdm' as unknown) as PublicKey,
        account: {
          executable: false,
          owner: ('HPx9TD5Le9VMGXBXoXZwjDVsTPK1g86gr7zYtGUmyYdm' as unknown) as PublicKey,
          lamports: 30000,
          data: {
            program: 'string',
            parsed: 'any',
            space: 3,
          },
        },
      },
    ];

    WalletMutations.SET_AUXILIARY_TOKEN_ACCOUNTS(testState, expected);
    expect(testState.auxiliaryTokenAccounts).toEqual(expected);
  });

  test('it should set countdown', () => {
    const expected = 3000;

    WalletMutations.SET_COUNTDOWN(testState, expected);
    expect(testState.countdown).toEqual(expected);
  });

  test('it should set countdown', () => {
    const expected = 3000;

    WalletMutations.SET_LAST_SUB_BLOCK(testState, expected);
    expect(testState.lastSubBlock).toEqual(expected);
  });
});
