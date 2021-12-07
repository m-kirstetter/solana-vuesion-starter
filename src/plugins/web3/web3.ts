import { Connection } from '@solana/web3.js';
import { Plugin } from '@nuxt/types';
import axios from 'axios';
import { web3Config, commitment } from '@/utils/web3';
import logger from '@/utils/logger';

export interface Rpc {
  url: string;
  weight: number;
}

const createWeb3Instance = (endpoint: string) => {
  const web3 = new Connection(endpoint, commitment);
  return web3;
};

async function getFastEndpoint(endpoints: Rpc[]) {
  return await Promise.any(
    endpoints.map((endpoint) =>
      axios.post(endpoint.url, { jsonrpc: '2.0', id: 1, method: 'getEpochInfo' }).then(() => endpoint.url),
    ),
  );
}

const web3Plugin: Plugin = async (_context, inject) => {
  const endpoint = await getFastEndpoint(web3Config.rpcs);

  logger(`config from: local, strategy: speed, using ${endpoint}`);

  const web3 = createWeb3Instance(endpoint);

  inject('web3', web3);
};

export default web3Plugin;
