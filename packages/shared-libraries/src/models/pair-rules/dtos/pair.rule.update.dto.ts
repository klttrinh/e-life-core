import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RateSourceEnum } from '../../../interfaces';
import { PairRuleActionsEnum } from '../enums/pair.rule.actions.enum';

export class PairRuleUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ example: 'USDT/USD' })
  @IsString()
  @IsOptional()
  pair?: string;

  @ApiPropertyOptional({ enum: RateSourceEnum, example: RateSourceEnum.BINANCE })
  @IsEnum(RateSourceEnum)
  @IsOptional()
  provider?: RateSourceEnum;

  @ApiPropertyOptional({ enum: PairRuleActionsEnum, example: PairRuleActionsEnum.EXCLUDE_PROVIDER })
  @IsEnum(PairRuleActionsEnum)
  @IsOptional()
  action?: PairRuleActionsEnum;
}
