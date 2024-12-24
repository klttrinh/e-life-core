/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { providers, Wallet, ContractTransaction, BigNumber, utils } from 'ethers/lib';
import { Lock__factory, Lock } from '@e-life/smart-contract';

@Injectable()
export class LockSmartContractService {
  private provider: providers.JsonRpcProvider;

  private signer: Wallet;

  private lockContractFactory: Lock__factory;

  private lockContract: Lock;

  private interface: utils.Interface;

  constructor() {
    this.provider = new providers.JsonRpcProvider({
      url: process.env.EVM_URL || 'http://127.0.0.1:8545/',
    });
    this.signer = new Wallet(
      process.env.EVM_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      this.provider,
    );
    this.lockContractFactory = new Lock__factory(this.signer);
    this.lockContract = this.lockContractFactory.attach(
      process.env.LOCK_CONTRACT_ADDRESS || '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
    );

    this.interface = this.lockContract.interface;
  }

  async getLockContractAddress(): Promise<string> {
    return this.lockContract.address;
  }

  async getLockContractOwner(): Promise<string> {
    return this.lockContract.owner();
  }

  async submitWithdrawTransaction(): Promise<ContractTransaction> {
    const tt = await this.lockContract.withdraw();
    const receipt = await tt.wait();

    receipt.events?.forEach((event) => {
      const parsedLog = this.interface.parseLog(event);
      if (parsedLog.name === 'LogMessage') {
        const { _unlockTime } = parsedLog.args!;
        console.log(`Unlock Time: ${_unlockTime.toString()}`);
      }

      if (parsedLog.name === 'Withdrawal') {
        const { amount, when } = event.args!;
        console.log(`Withdrawal Amount: ${amount.toString()}`);
        console.log(`When: ${when}`);
      }
    });
    return tt;
  }

  async getLockContractUnlockTime(): Promise<BigNumber> {
    return this.lockContract.unlockTime();
  }
}
