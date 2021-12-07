import { PublicKey, AccountInfo, ParsedAccountData } from '@solana/web3.js';

const AUTO_REFRESH_TIME = 60;

export interface IWalletState {
  initialized: boolean;
  loading: boolean;
  modalShow: boolean;

  autoRefreshTime: number;
  countdown: number;
  lastSubBlock: number;

  connected: boolean;
  address: string;
  name: string;

  tokenAccounts: Record<string, unknown>;
  auxiliaryTokenAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }>;
}

export const WalletDefaultState = (): IWalletState => {
  return {
    initialized: false,
    loading: false,
    modalShow: false,

    autoRefreshTime: AUTO_REFRESH_TIME,
    countdown: 0,
    lastSubBlock: 0,

    connected: false,
    address: '',
    name: '',

    tokenAccounts: {},
    auxiliaryTokenAccounts: [] as Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }>,
  };
};

export default WalletDefaultState;
