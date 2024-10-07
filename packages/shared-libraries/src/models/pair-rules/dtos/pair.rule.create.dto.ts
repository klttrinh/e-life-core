import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RateSourceEnum } from '../../../interfaces';
import { PairRuleActionsEnum } from '../enums/pair.rule.actions.enum';

export class PairRuleCreateDto {
  @ApiProperty({ example: 'USDT/USD' })
  @IsString()
  pair: string;

  @ApiProperty({ enum: RateSourceEnum, example: RateSourceEnum.BINANCE })
  @IsEnum(RateSourceEnum)
  provider: RateSourceEnum;

  @ApiProperty({ enum: PairRuleActionsEnum, example: PairRuleActionsEnum.EXCLUDE_PROVIDER })
  @IsEnum(PairRuleActionsEnum)
  action: PairRuleActionsEnum;
}
