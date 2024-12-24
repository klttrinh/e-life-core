import { Module } from '@nestjs/common';
import { TokenSmartContractService } from './token-smart-contract.service';
import { TokenSmartContractController } from './token-smart-contract.controller';

@Module({
  providers: [TokenSmartContractService],
  controllers: [TokenSmartContractController],
  exports: [TokenSmartContractService],
})
export class TokenSmartContractModule {}
