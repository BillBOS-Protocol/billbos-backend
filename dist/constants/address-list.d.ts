import { NetworkID } from './network-id';
type AddressType<T> = T extends NetworkID.Mainnet ? typeof bkcTest : T extends NetworkID.BkcTest ? typeof sepolia : T extends NetworkID.Sepolia ? typeof mainnet : null;
export declare const getAddressList: <T extends NetworkID>(networkID: T) => AddressType<T>;
declare const mainnet: {
    Transcrypt: string;
    BUSD: string;
    USDT: string;
    USDC: string;
    DAI: string;
    SwapRouter: string;
    Multicall: string;
    Explorer: string;
};
declare const sepolia: {
    Transcrypt: string;
    BUSD: string;
    USDT: string;
    USDC: string;
    DAI: string;
    SwapRouter: string;
    Multicall: string;
    Explorer: string;
};
declare const bkcTest: {
    Transcrypt: string;
    BUSD: string;
    USDT: string;
    USDC: string;
    DAI: string;
    PHCP: string;
    WIS: string;
    BNB: string;
    SwapRouter: string;
    Multicall: string;
    Explorer: string;
};
export {};
