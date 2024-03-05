// import { allowedNetwork } from 'constants/chain';
import { ethers } from 'ethers';

export const getProvider = (rpc: string) => {
  const provider = new ethers.JsonRpcProvider(rpc);
  return provider;
};

export const getSigner = (rpc: string): ethers.Wallet | null => {
  const pk =
    typeof process.env.PRIVATE_KEY !== 'undefined'
      ? process.env.PRIVATE_KEY
      : '';
  if (pk === '') {
    return null;
  }
  const provider = getProvider(rpc);
  const signer = new ethers.Wallet(pk, provider);
  return signer;
};
