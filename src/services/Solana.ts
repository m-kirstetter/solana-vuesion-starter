import {
  // eslint-disable-next-line
  PublicKey,
} from '@solana/web3.js';

import type { WalletAdapter } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolongWalletAdapter } from '@solana/wallet-adapter-solong';
import { MathWalletWalletAdapter } from '@solana/wallet-adapter-mathwallet';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import { LedgerWalletAdapter, getDerivationPath } from '@solana/wallet-adapter-ledger';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { Coin98WalletAdapter } from '@solana/wallet-adapter-coin98';
import { SafePalWalletAdapter } from '@solana/wallet-adapter-safepal';
import { BitpieWalletAdapter } from '@solana/wallet-adapter-bitpie';
import { EventBus } from './EventBus';

export interface WalletInfo {
  // official website
  website: string;
  // provider url for web wallet
  providerUrl?: string;
  // chrome extension install url
  chromeUrl?: string;
  // firefox extension install url
  firefoxUrl?: string;
  // isExtension: boolean
  getAdapter: (providerUrl?: string) => WalletAdapter;
}

type IWallets = { [key: string]: WalletInfo };

const baseWallets: IWallets = {
  Phantom: {
    website: 'https://phantom.app',
    chromeUrl: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
    getAdapter() {
      return new PhantomWalletAdapter();
    },
  },
  'Solflare Extension': {
    website: 'https://solflare.com',
    firefoxUrl: 'https://addons.mozilla.org/en-US/firefox/addon/solflare-wallet',
    getAdapter() {
      return new SolflareWalletAdapter();
    },
  },
  'Sollet Web': {
    website: 'https://www.sollet.io',
    providerUrl: 'https://www.sollet.io',
    getAdapter(providerUrl) {
      return new SolletWalletAdapter({ provider: providerUrl });
    },
  },
  'Sollet Extension': {
    website: 'https://www.sollet.io',
    chromeUrl: 'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno',
    getAdapter() {
      return new SolletWalletAdapter({ provider: (window as any).sollet });
    },
  },
  Ledger: {
    website: 'https://www.ledger.com',
    getAdapter() {
      return new LedgerWalletAdapter({ derivationPath: getDerivationPath() });
    },
  },
  MathWallet: {
    website: 'https://mathwallet.org',
    chromeUrl: 'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
    getAdapter() {
      return new MathWalletWalletAdapter();
    },
  },
  Solong: {
    website: 'https://solongwallet.com',
    chromeUrl: 'https://chrome.google.com/webstore/detail/solong/memijejgibaodndkimcclfapfladdchj',
    getAdapter() {
      return new SolongWalletAdapter();
    },
  },
  Coin98: {
    website: 'https://www.coin98.com',
    chromeUrl: 'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
    getAdapter() {
      return new Coin98WalletAdapter();
    },
  },
  Safepal: {
    website: 'https://safepal.io',
    getAdapter() {
      return new SafePalWalletAdapter();
    },
  },
  Bitpie: {
    website: 'https://bitpie.com',
    getAdapter() {
      return new BitpieWalletAdapter();
    },
  },
  'Solflare Web': {
    website: 'https://solflare.com',
    providerUrl: 'https://solflare.com/access-wallet',
    getAdapter(providerUrl) {
      return new SolletWalletAdapter({ provider: providerUrl });
    },
  },
};

export default class SolanaConnect {
  private _checkInterval: ReturnType<typeof setTimeout>;

  wallets: IWallets;
  name: string;
  adapter: WalletAdapter;
  walletTimer: number | undefined = undefined;

  constructor(wallets: IWallets = baseWallets) {
    this.wallets = wallets;
  }

  async initialize(name: string, wallet: WalletInfo) {
    this.name = name;
    this.adapter = wallet.getAdapter(wallet.providerUrl);

    if (this.adapter) {
      this.adapter.on('connect', this._onConnect);
      this.adapter.on('disconnect', this._onDisconnect);
      this.adapter.on('error', this._onWalletError);

      await this.adapter.connect();

      return () => {
        this.adapter.off('connect', this._onConnect);
        this.adapter.off('disconnect', this._onDisconnect);
        this.adapter.off('error', this._onWalletError);
      };
    }
  }

  private _onConnect() {
    if (this.adapter && this.adapter.publicKey) {
      EventBus.$emit('connected');
    }
  }

  private async _onDisconnect() {
    await this.disconnect();
  }

  private _onWalletError(error: Error) {
    if (this.name) {
      const info = this.wallets[this.name];

      if (info) {
        const { website, chromeUrl, firefoxUrl } = info;

        if (['WalletNotFoundError', 'WalletNotInstalledError', 'WalletNotReadyError'].includes(error.name)) {
          const errorName = error.name
            .replace('Error', '')
            .split(/(?=[A-Z])/g)
            .join(' ');

          EventBus.$emit('error', {
            message: errorName,
            description: (h: any) => {
              const msg = [
                `Please install and initialize ${name} wallet extension first, `,
                h('a', { attrs: { href: website, target: '_blank' } }, 'click here to visit official website'),
              ];

              if (chromeUrl || firefoxUrl) {
                const installUrl = /Firefox/.test(navigator.userAgent) ? firefoxUrl : chromeUrl;
                if (installUrl) {
                  msg.push(' or ');
                  msg.push(
                    h('a', { attrs: { href: installUrl, target: '_blank' } }, 'click here to install extension'),
                  );
                }
              }

              return h('div', msg);
            },
          });

          return;
        }
      }
    }

    if (['SecurityError'].includes(error.name)) {
      this._onConnect();
      return;
    }

    EventBus.$emit('error', {
      message: 'Connect wallet failed',
      description: `${error.name}`,
    });
  }

  getAddress() {
    if (this.adapter?.connected) {
      return this.adapter.publicKey.toBase58();
    } else {
      return '';
    }
  }

  async disconnect() {
    try {
      await this.adapter.disconnect();
    } catch (error) {}

    this.name = null;
    this.adapter = null;

    // this.unsubWallet();

    EventBus.$emit('disconnected');
  }
}
