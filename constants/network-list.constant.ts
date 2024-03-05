import { Network_ID } from './network-id.enum';

// type AddressType<T> = T extends Network_ID.Mainnet
//   ? typeof sepolia
//   : T extends Network_ID.Sepolia
//   ? typeof bkcTest
//   : T extends Network_ID.BkcTest
//   ? typeof mainnet
//   : null;

// export const getNetworkChain = <T extends Network_ID>(networkID: T) => {
//   switch (networkID) {
//     case Network_ID.BkcTest:
//       return bkcTest as AddressType<T>;
//     default:
//   }
// };

export const NETWORK_LIST = {
  [Network_ID.BkcTest]: {
    id: 25925,
    name: 'BKC Testnet',
    nativeCurrency: { name: 'Kub coin', symbol: 'KUB', decimals: 18 },
    rpcUrls: ['https://rpc-testnet.bitkubchain.io'],
    blockExplorers: [
      {
        name: 'testnet.bkcscan',
        url: 'https://testnet.bkcscan.com',
      },
    ],
  },
  [Network_ID.J2OTaro]: {
    id: 35011,
    name: 'J2O Taro',
    nativeCurrency: { name: 'Taro coin', symbol: 'TARO', decimals: 18 },
    rpcUrls: ['https://rpc.j2o.io'],
    blockExplorers: [
      {
        name: '',
        url: 'https://exp.j2o.io/',
      },
    ],
  },
};
