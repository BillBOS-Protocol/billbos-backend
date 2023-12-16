import { ethers } from 'ethers';

export const getProvider = () => {
  // const provider = new ethers.JsonRpcProvider(allowedNetwork[0].rpcUrls[0]);
  const RPC_URL = process.env.SEPOLIA_RPC_URL;
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  return provider;
};

export const getSigner = (): ethers.Wallet | null => {
  const pk =
    typeof process.env.PRIVATE_KEY !== 'undefined'
      ? process.env.PRIVATE_KEY
      : '';
  if (pk === '') {
    return null;
  }
  const provider = getProvider();
  const signer = new ethers.Wallet(pk, provider);
  return signer;
};
