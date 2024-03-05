import { ADDRESS_LIST } from 'src/constants/address-list.constant';
import { Network_ID } from 'src/constants/network-id.enum';
import { NETWORK_LIST } from 'src/constants/network-list.constant';

export const getChain = (networkId: Network_ID) => {
  return NETWORK_LIST[networkId];
};

export const getAddressList = (networkId: Network_ID) => {
  return ADDRESS_LIST[networkId];
};
