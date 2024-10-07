import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../general';
import { RateSourceEnum } from '../../../interfaces';
import { PairRuleActionsEnum } from '../enums/pair.rule.actions.enum';

export class PairRuleQueryDto extends PaginationQueryDto {
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
