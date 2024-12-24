/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { providers, Wallet, ContractTransaction, BigNumber, utils } from 'ethers/lib';
import { Tokens__factory, Tokens } from '@e-life/smart-contract';

@Injectable()
export class TokenSmartContractService {
  private provider: providers.JsonRpcProvider;

  private signer: Wallet;

  private TokenContractFactory: Tokens__factory;

  private TokenContract: Tokens;

  private interface: utils.Interface;

  constructor() {
    this.provider = new providers.JsonRpcProvider({
      url: process.env.EVM_URL || 'http://127.0.0.1:8545/',
    });
    this.signer = new Wallet(
      process.env.EVM_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      this.provider,
    );
    this.TokenContractFactory = new Tokens__factory(this.signer);
    this.TokenContract = this.TokenContractFactory.attach(
      process.env.TOKEN_CONTRACT_ADDRESS || '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    );

    this.interface = this.TokenContract.interface;
  }

  async getTokenContractAddress(): Promise<string> {
    return this.TokenContract.address;
  }

  async getTokenContractOwner(): Promise<string> {
    return this.TokenContract.owner();
  }

  async mint(to: string, amount: string): Promise<ContractTransaction> {
    const tx = await this.TokenContract.mint(to, utils.parseUnits(amount, 18));
    return tx;
  }

  async totalSupply(): Promise<string> {
    return (await this.TokenContract.totalSupply()).toString();
  }
}
