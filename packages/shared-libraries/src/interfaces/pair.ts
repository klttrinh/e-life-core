import { RateSourceEnum } from './rate';

export type IPairTTL = { [key in RateSourceEnum]?: number };

export interface IPair {
  id: number;
  pair: string;
  ttl: IPairTTL;
  providers: RateSourceEnum[];
  ohlcTolerance_1m: number;
  ohlcTolerance_5m: number;
  ohlcTolerance_24h: number;
}
