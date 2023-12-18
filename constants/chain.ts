export const allowedNetwork: Record<string, any>[] = [
  {
    chainId: 25925,
    chainName: 'Bitkub Chain Testnet',
    nativeCurrency: {
      name: 'KUB',
      symbol: 'KUB',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-testnet.bitkubchain.io'],
    blockExplorerUrls: ['https://testnet.bkcscan.com'],
  },
  {
    chainId: 3502,
    chainName: 'Fjin J2O Taro testnet',
    nativeCurrency: {
      name: 'JFIN coin',
      symbol: 'JFIN',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.testnet.jfinchain.com'],
    blockExplorerUrls: ['https://exp.jfinchain.com'],
  },
];
