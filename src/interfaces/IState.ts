import { IWalletState } from '@/store/wallet/state';

export interface IState {
  i18n: {
    locale: string;
  };
  wallet: IWalletState;
}
