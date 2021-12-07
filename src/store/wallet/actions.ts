import { ActionContext } from 'vuex';
import { IState } from '@/interfaces/IState';
import { IWalletState } from './state';

export interface IWalletActions {
  connect(context: ActionContext<IWalletState, IState>, data: { address: string; name: string }): void;
  disconnect(context: ActionContext<IWalletState, IState>): void;
}

export const WalletActions: IWalletActions = {
  connect({ commit }, { name, address }) {
    commit('SET_CONNECTED', true);
    commit('SET_NAME', name);
    commit('SET_ADDRESS', address);
  },
  disconnect({ commit }) {
    commit('SET_CONNECTED', false);
    commit('SET_NAME', '');
    commit('SET_ADDRESS', '');
  },
};

export default WalletActions;
