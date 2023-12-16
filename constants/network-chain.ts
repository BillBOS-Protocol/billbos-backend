import { NetworkID } from './network-id';

type AddressType<T> = T extends NetworkID.Mainnet
  ? typeof sepolia
  : T extends NetworkID.Sepolia
  ? typeof bkcTest
  : T extends NetworkID.BkcTest
  ? typeof mainnet
  : null;

export const getNetworkChain = <T extends NetworkID>(networkID: T) => {
  switch (networkID) {
    case NetworkID.Sepolia:
      return sepolia as AddressType<T>;
    case NetworkID.BkcTest:
      return bkcTest as AddressType<T>;
    default:
      return mainnet as AddressType<T>;
  }
};

const mainnet = {
  id: 1,
  name: 'Mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: [
    process.env.ALCHEMY_ID
      ? `https://mainnet.infura.io/v3/${process.env.ALCHEMY_ID}`
      : 'https://mainnet.infura.io/v3/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_',
  ],
  blockExplorers: [{ name: 'Etherscan', url: 'https://etherscan.io' }],
  wss: process.env.ALCHEMY_ID
    ? `wss://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`
    : 'wss://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_',
};

const sepolia = {
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'SepoliaETH', decimals: 18 },
  rpcUrls: [
    process.env.ALCHEMY_ID
      ? `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`
      : 'https://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_',
  ],
  blockExplorers: [{ name: 'Etherscan', url: 'https://rinkeby.etherscan.io' }],
  testnet: true,
  wss: process.env.ALCHEMY_ID
    ? `wss://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`
    : 'wss://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_',
};

const bkcTest = {
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
  testnet: true,
};
