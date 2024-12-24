import { Body, Controller, Get, Post } from '@nestjs/common';

import { BigNumber, ContractTransaction } from 'ethers/lib';
import { ApiTags } from '@nestjs/swagger';
import { TokenSmartContractService } from './token-smart-contract.service';
import { MintDto } from './dtos';

@Controller('token-smart-contract')
@ApiTags('token-smart-contract')
export class TokenSmartContractController {
  constructor(private readonly tokenSmartContractService: TokenSmartContractService) {}

  @Get('/owner')
  async getTokenContractOwner(): Promise<string> {
    return this.tokenSmartContractService.getTokenContractAddress();
  }

  @Get('/address')
  async getLockContractAddress(): Promise<string> {
    return this.tokenSmartContractService.getTokenContractAddress();
  }

  @Post('/mint')
  async getLockContractUnlockTime(@Body() dto: MintDto): Promise<ContractTransaction> {
    return this.tokenSmartContractService.mint(dto.address, dto.amount);
  }

  @Get('/total-supply')
  async getTotalSupply(): Promise<string> {
    return this.tokenSmartContractService.totalSupply();
  }
}
