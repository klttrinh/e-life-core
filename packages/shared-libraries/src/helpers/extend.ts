import { OmitType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export function Extend<T, K extends keyof T>(
  target: Type<T>,
  exclusions: K[],
): Type<Omit<T, (typeof exclusions)[number]>> {
  return OmitType(target as any, exclusions as never[]);
}
