import { IWalletState } from './state';

export interface IWalletGetters {
  connected(state: IWalletState): boolean;
}

export const WalletGetters: IWalletGetters = {
  connected(state) {
    return state.connected;
  },
};

export default WalletGetters;
