"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkChain = void 0;
const network_id_1 = require("./network-id");
const getNetworkChain = (networkID) => {
    switch (networkID) {
        case network_id_1.NetworkID.Sepolia:
            return sepolia;
        case network_id_1.NetworkID.BkcTest:
            return bkcTest;
        default:
            return mainnet;
    }
};
exports.getNetworkChain = getNetworkChain;
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
//# sourceMappingURL=network-chain.js.map