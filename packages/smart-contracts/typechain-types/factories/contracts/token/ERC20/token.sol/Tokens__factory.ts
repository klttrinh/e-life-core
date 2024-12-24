/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  Tokens,
  TokensInterface,
} from "../../../../../contracts/token/ERC20/token.sol/Tokens";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600881526020017f47616d65436f696e0000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f47434e000000000000000000000000000000000000000000000000000000000081525081600390816200008f919062000412565b508060049081620000a1919062000412565b505050620000c4620000b8620000ca60201b60201c565b620000d260201b60201c565b620004f9565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200021a57607f821691505b60208210810362000230576200022f620001d2565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200029a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200025b565b620002a686836200025b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002f3620002ed620002e784620002be565b620002c8565b620002be565b9050919050565b6000819050919050565b6200030f83620002d2565b620003276200031e82620002fa565b84845462000268565b825550505050565b600090565b6200033e6200032f565b6200034b81848462000304565b505050565b5b8181101562000373576200036760008262000334565b60018101905062000351565b5050565b601f821115620003c2576200038c8162000236565b62000397846200024b565b81016020851015620003a7578190505b620003bf620003b6856200024b565b83018262000350565b50505b505050565b600082821c905092915050565b6000620003e760001984600802620003c7565b1980831691505092915050565b6000620004028383620003d4565b9150826002028217905092915050565b6200041d8262000198565b67ffffffffffffffff811115620004395762000438620001a3565b5b62000445825462000201565b6200045282828562000377565b600060209050601f8311600181146200048a576000841562000475578287015190505b620004818582620003f4565b865550620004f1565b601f1984166200049a8662000236565b60005b82811015620004c4578489015182556001820191506020850194506020810190506200049d565b86831015620004e45784890151620004e0601f891682620003d4565b8355505b6001600288020188555050505b505050505050565b611a5b80620005096000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063a457c2d711610066578063a457c2d71461029d578063a9059cbb146102cd578063dd62ed3e146102fd578063f2fde38b1461032d57610100565b8063715018a61461023b5780638da5cb5b1461024557806395d89b41146102635780639dc29fac1461028157610100565b8063313ce567116100d3578063313ce567146101a157806339509351146101bf57806340c10f19146101ef57806370a082311461020b57610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd1461015357806323b872dd14610171575b600080fd5b61010d610349565b60405161011a91906110b8565b60405180910390f35b61013d60048036038101906101389190611173565b6103db565b60405161014a91906111ce565b60405180910390f35b61015b6103f2565b60405161016891906111f8565b60405180910390f35b61018b60048036038101906101869190611213565b610401565b60405161019891906111ce565b60405180910390f35b6101a9610438565b6040516101b69190611282565b60405180910390f35b6101d960048036038101906101d49190611173565b610441565b6040516101e691906111ce565b60405180910390f35b61020960048036038101906102049190611173565b610478565b005b6102256004803603810190610220919061129d565b61048e565b60405161023291906111f8565b60405180910390f35b6102436104a0565b005b61024d6104b4565b60405161025a91906112d9565b60405180910390f35b61026b6104de565b60405161027891906110b8565b60405180910390f35b61029b60048036038101906102969190611173565b610570565b005b6102b760048036038101906102b29190611173565b610586565b6040516102c491906111ce565b60405180910390f35b6102e760048036038101906102e29190611173565b6105fd565b6040516102f491906111ce565b60405180910390f35b610317600480360381019061031291906112f4565b610614565b60405161032491906111f8565b60405180910390f35b6103476004803603810190610342919061129d565b61069b565b005b60606003805461035890611363565b80601f016020809104026020016040519081016040528092919081815260200182805461038490611363565b80156103d15780601f106103a6576101008083540402835291602001916103d1565b820191906000526020600020905b8154815290600101906020018083116103b457829003601f168201915b5050505050905090565b60006103e833848461071e565b6001905092915050565b60006103fc6108e7565b905090565b600061040e8484846108f1565b61042d84338461041e8833610614565b61042891906113c3565b61071e565b600190509392505050565b60006012905090565b60008061044c610b67565b905061046d81858561045e8589610614565b61046891906113f7565b61071e565b600191505092915050565b610480610b6f565b61048a8282610bed565b5050565b600061049982610d43565b9050919050565b6104a8610b6f565b6104b26000610d8b565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546104ed90611363565b80601f016020809104026020016040519081016040528092919081815260200182805461051990611363565b80156105665780601f1061053b57610100808354040283529160200191610566565b820191906000526020600020905b81548152906001019060200180831161054957829003601f168201915b5050505050905090565b610578610b6f565b6105828282610e51565b5050565b600080610591610b67565b9050600061059f8286610614565b9050838110156105e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105db9061149d565b60405180910390fd5b6105f1828686840361071e565b60019250505092915050565b600061060a3384846108f1565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6106a3610b6f565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610712576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107099061152f565b60405180910390fd5b61071b81610d8b565b50565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361078d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610784906115c1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f390611653565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516108da91906111f8565b60405180910390a3505050565b6000600254905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610960576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610957906116e5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c690611777565b60405180910390fd5b6109da83838361101e565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5790611809565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b4e91906111f8565b60405180910390a3610b61848484611023565b50505050565b600033905090565b610b77610b67565b73ffffffffffffffffffffffffffffffffffffffff16610b956104b4565b73ffffffffffffffffffffffffffffffffffffffff1614610beb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be290611875565b60405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c53906118e1565b60405180910390fd5b610c686000838361101e565b8060026000828254610c7a91906113f7565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d2b91906111f8565b60405180910390a3610d3f60008383611023565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ec0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb790611973565b60405180910390fd5b610ecc8260008361101e565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610f52576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4990611a05565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161100591906111f8565b60405180910390a361101983600084611023565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611062578082015181840152602081019050611047565b60008484015250505050565b6000601f19601f8301169050919050565b600061108a82611028565b6110948185611033565b93506110a4818560208601611044565b6110ad8161106e565b840191505092915050565b600060208201905081810360008301526110d2818461107f565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061110a826110df565b9050919050565b61111a816110ff565b811461112557600080fd5b50565b60008135905061113781611111565b92915050565b6000819050919050565b6111508161113d565b811461115b57600080fd5b50565b60008135905061116d81611147565b92915050565b6000806040838503121561118a576111896110da565b5b600061119885828601611128565b92505060206111a98582860161115e565b9150509250929050565b60008115159050919050565b6111c8816111b3565b82525050565b60006020820190506111e360008301846111bf565b92915050565b6111f28161113d565b82525050565b600060208201905061120d60008301846111e9565b92915050565b60008060006060848603121561122c5761122b6110da565b5b600061123a86828701611128565b935050602061124b86828701611128565b925050604061125c8682870161115e565b9150509250925092565b600060ff82169050919050565b61127c81611266565b82525050565b60006020820190506112976000830184611273565b92915050565b6000602082840312156112b3576112b26110da565b5b60006112c184828501611128565b91505092915050565b6112d3816110ff565b82525050565b60006020820190506112ee60008301846112ca565b92915050565b6000806040838503121561130b5761130a6110da565b5b600061131985828601611128565b925050602061132a85828601611128565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061137b57607f821691505b60208210810361138e5761138d611334565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113ce8261113d565b91506113d98361113d565b92508282039050818111156113f1576113f0611394565b5b92915050565b60006114028261113d565b915061140d8361113d565b925082820190508082111561142557611424611394565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611487602583611033565b91506114928261142b565b604082019050919050565b600060208201905081810360008301526114b68161147a565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611519602683611033565b9150611524826114bd565b604082019050919050565b600060208201905081810360008301526115488161150c565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006115ab602483611033565b91506115b68261154f565b604082019050919050565b600060208201905081810360008301526115da8161159e565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061163d602283611033565b9150611648826115e1565b604082019050919050565b6000602082019050818103600083015261166c81611630565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006116cf602583611033565b91506116da82611673565b604082019050919050565b600060208201905081810360008301526116fe816116c2565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611761602383611033565b915061176c82611705565b604082019050919050565b6000602082019050818103600083015261179081611754565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006117f3602683611033565b91506117fe82611797565b604082019050919050565b60006020820190508181036000830152611822816117e6565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061185f602083611033565b915061186a82611829565b602082019050919050565b6000602082019050818103600083015261188e81611852565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60006118cb601f83611033565b91506118d682611895565b602082019050919050565b600060208201905081810360008301526118fa816118be565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061195d602183611033565b915061196882611901565b604082019050919050565b6000602082019050818103600083015261198c81611950565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b60006119ef602283611033565b91506119fa82611993565b604082019050919050565b60006020820190508181036000830152611a1e816119e2565b905091905056fea2646970667358221220185fe7752021596bbae22ab0ad943ce7247077d0197f877fc5f0fb9f8b00ea7764736f6c63430008120033";

type TokensConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokensConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Tokens__factory extends ContractFactory {
  constructor(...args: TokensConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Tokens> {
    return super.deploy(overrides || {}) as Promise<Tokens>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Tokens {
    return super.attach(address) as Tokens;
  }
  override connect(signer: Signer): Tokens__factory {
    return super.connect(signer) as Tokens__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokensInterface {
    return new utils.Interface(_abi) as TokensInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Tokens {
    return new Contract(address, _abi, signerOrProvider) as Tokens;
  }
}
