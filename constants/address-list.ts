import { NetworkID } from './network-id';

type AddressType<T> = T extends NetworkID.Mainnet
  ? typeof bkcTest
  : T extends NetworkID.BkcTest
  ? typeof sepolia
  : T extends NetworkID.Sepolia
  ? typeof mainnet
  : null;

export const getAddressList = <T extends NetworkID>(networkID: T) => {
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
  Transcrypt: '',
  BUSD: '',
  USDT: '',
  USDC: '',
  DAI: '',
  SwapRouter: '',
  Multicall: '',
  Explorer: 'https://etherscan.io',
};

const sepolia = {
  Transcrypt: '',
  BUSD: '',
  USDT: '',
  USDC: '',
  DAI: '',
  SwapRouter: '',
  Multicall: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  Explorer: 'https://rinkeby.etherscan.io',
};

const bkcTest = {
  Transcrypt: '0xBd87c5501bEdF25c944375661e4926b8981c3d25',
  BUSD: '0x12bd9885341dc390986931c2d3d466D70E84b4e1',
  USDT: '0x2cDCc9f5934E54EbAf694b86B4fF29195372febd',
  USDC: '0x2564a6B3dC2E18044c509AfF6d0dC059Fd0061A8',
  DAI: '0x68C87D825EB675C6772fa6A21628d4565F66547d',
  PHCP: '0x17C8df2c1735438Af8497dcb9055b711b6e276F5',
  WIS: '0xC53a86d3e8Fb8373B6C34e4dd2300a439BC33742',
  BNB: '0xEF04133E09Cc944cEa5Ad892fcc1AC9665e3c6C9',
  SwapRouter: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  Multicall: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  Explorer: 'https://testnet.bscscan.com',
};
