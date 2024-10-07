export enum RateSourceEnum {
  NEXO = 'NEXO',
  KRAKEN = 'KRAKEN',
  SFOX = 'SFOX',
  FINERY = 'FINERY',
  FIXER = 'FIXER',
  EXCHANGE_RATE_API = 'EXCHANGE_RATE_API',
  BINANCE = 'BINANCE',
  FASTEX = 'FASTEX',
}

export interface IRate {
  timestamp: number;
  pair: string;
  source: RateSourceEnum;
  sourceId?: number;
  price: number;
  suspected?: boolean;
  weight: number;
  ingredients?: IRate[];
}

export type IProviderPairs = { [key in RateSourceEnum]?: string[] };
