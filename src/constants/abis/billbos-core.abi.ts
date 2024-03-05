export const BillBOSCore_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_billbosAdaptorAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stakedTokenAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_webpageOwner',
        type: 'address',
      },
    ],
    name: '_claimReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adsContent',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageCID',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newTabLink',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'widgetLink',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isInteractive',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adsId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adsIdLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adsStakedBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'billbosAdaptorAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_adsId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'boost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'imageCID',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'newTabLink',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'widgetLink',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isInteractive',
            type: 'bool',
          },
        ],
        internalType: 'struct IBillBOSCore.AdsContent',
        name: '_ads',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'createAds',
    outputs: [
      {
        internalType: 'uint256',
        name: '_adsIdLast',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAds',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'adsId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'imageCID',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'newTabLink',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'widgetLink',
                type: 'string',
              },
              {
                internalType: 'bool',
                name: 'isInteractive',
                type: 'bool',
              },
            ],
            internalType: 'struct IBillBOSCore.AdsContent',
            name: 'adsContent',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'adsStakedBalance',
            type: 'uint256',
          },
        ],
        internalType: 'struct IBillBOSCore.AdsRes[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_adsOwner',
        type: 'address',
      },
    ],
    name: 'getAdsUser',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'adsId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'imageCID',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'newTabLink',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'widgetLink',
                type: 'string',
              },
              {
                internalType: 'bool',
                name: 'isInteractive',
                type: 'bool',
              },
            ],
            internalType: 'struct IBillBOSCore.AdsContent',
            name: 'adsContent',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'adsStakedBalance',
            type: 'uint256',
          },
        ],
        internalType: 'struct IBillBOSCore.AdsRes[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_webpageOwner',
        type: 'address',
      },
    ],
    name: 'getReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'monthClaimedReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'monthCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'platformBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_billbosAdaptorAddress',
        type: 'address',
      },
    ],
    name: 'setBillbosAdaptorAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakedTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalEarningBalanceLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStakedBalanceLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_adsId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'unboost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_adsId',
        type: 'uint256',
      },
    ],
    name: 'unboostAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_adsId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'imageCID',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'newTabLink',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'widgetLink',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isInteractive',
            type: 'bool',
          },
        ],
        internalType: 'struct IBillBOSCore.AdsContent',
        name: '_ads',
        type: 'tuple',
      },
    ],
    name: 'updateAds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_webpageOwner',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_viewCount',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '_totalViewCount',
        type: 'uint256',
      },
    ],
    name: 'uploadAdsReport',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'webpageOwnerIdLast',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
