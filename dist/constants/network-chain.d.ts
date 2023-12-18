import { NetworkID } from './network-id';
type AddressType<T> = T extends NetworkID.Mainnet ? typeof sepolia : T extends NetworkID.Sepolia ? typeof bkcTest : T extends NetworkID.BkcTest ? typeof mainnet : null;
export declare const getNetworkChain: <T extends NetworkID>(networkID: T) => AddressType<T>;
declare const mainnet: {
    id: number;
    name: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorers: {
        name: string;
        url: string;
    }[];
    wss: string;
};
declare const sepolia: {
    id: number;
    name: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorers: {
        name: string;
        url: string;
    }[];
    testnet: boolean;
    wss: string;
};
declare const bkcTest: {
    id: number;
    name: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorers: {
        name: string;
        url: string;
    }[];
    testnet: boolean;
};
export {};
