"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigner = exports.getProvider = void 0;
const chain_1 = require("../constants/chain");
const ethers_1 = require("ethers");
const getProvider = () => {
    const provider = new ethers_1.ethers.JsonRpcProvider(chain_1.allowedNetwork[1].rpcUrls[0]);
    return provider;
};
exports.getProvider = getProvider;
const getSigner = () => {
    const pk = typeof process.env.PRIVATE_KEY !== 'undefined'
        ? process.env.PRIVATE_KEY
        : '';
    if (pk === '') {
        return null;
    }
    const provider = (0, exports.getProvider)();
    const signer = new ethers_1.ethers.Wallet(pk, provider);
    return signer;
};
exports.getSigner = getSigner;
//# sourceMappingURL=wallet.util.js.map