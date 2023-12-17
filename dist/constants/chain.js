"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedNetwork = void 0;
exports.allowedNetwork = [
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
        chainId: 11155111,
        chainName: 'sepolia',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'sepoliaETH',
            decimals: 18,
        },
        rpcUrls: ['https://ethereum-sepolia.publicnode.com'],
        blockExplorerUrls: ['https://sepolia.etherscan.io/'],
    },
];
//# sourceMappingURL=chain.js.map