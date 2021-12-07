import { cloneDeep } from 'lodash';
import { PublicKey, AccountInfo, ParsedAccountData } from '@solana/web3.js';
import { IWalletState } from './state';

export interface IWalletMutations {
  SET_CONNECTED(state: IWalletState, connected: boolean): void;
  SET_ADDRESS(state: IWalletState, address: string): void;
  SET_NAME(state: IWalletState, name: string): void;
  SET_INITIALIZED(state: IWalletState): void;
  SET_LOADING(state: IWalletState, loading: boolean): void;
  SET_TOKEN_ACCOUNTS(state: IWalletState, tokenAccounts: any): void;
  SET_AUXILIARY_TOKEN_ACCOUNTS(
    state: IWalletState,
    auxiliaryTokenAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }>,
  ): void;
  SET_COUNTDOWN(state: IWalletState, countdown: number): void;
  SET_LAST_SUB_BLOCK(state: IWalletState, lastSubBlock: number): void;
}

export const WalletMutations: IWalletMutations = {
  SET_CONNECTED(state, connected) {
    state.connected = connected;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_INITIALIZED(state) {
    state.initialized = true;
  },
  SET_LOADING(state, loading) {
    if (loading) {
      state.countdown = state.autoRefreshTime;
    }

    state.loading = loading;

    if (!loading) {
      state.countdown = 0;
    }
  },
  SET_TOKEN_ACCOUNTS(state, tokenAccounts) {
    state.tokenAccounts = cloneDeep(tokenAccounts);
  },
  SET_AUXILIARY_TOKEN_ACCOUNTS(state, auxiliaryTokenAccounts) {
    state.auxiliaryTokenAccounts = cloneDeep(auxiliaryTokenAccounts);
  },
  SET_COUNTDOWN(state, countdown) {
    state.countdown = countdown;
  },
  SET_LAST_SUB_BLOCK(state, lastSubBlock) {
    state.lastSubBlock = lastSubBlock;
  },
};

export default WalletMutations;
