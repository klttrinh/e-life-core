import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getHashes, pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CacheService } from '../../cache';

@Injectable()
export class CryptoService {
  private readonly pbkdf2Async = promisify(pbkdf2);

  private readonly salt: string;

  private iterations: number;

  private keylen: number;

  private algorithm: string;

  constructor(private readonly configService: ConfigService, private readonly cacheService: CacheService) {
    this.iterations = parseInt(this.configService.get('HASH_ITERATION'), 10);
    this.keylen = parseInt(this.configService.get('HASH_KEY_LENGTH'), 10);
    this.algorithm = this.getProperDigest(this.configService.get('HASH_ALGORITHM'));
    this.salt = this.configService.get('HASH_SALT');
  }

  // eslint-disable-next-line class-methods-use-this
  getProperDigest(hashAlgorithm: string) {
    const hashAlgo = getHashes().find((hash) => hash.toLocaleUpperCase() === hashAlgorithm?.toLocaleUpperCase());
    return hashAlgo || 'SHA256';
  }

  async hashPassword(password: string) {
    const hashPass = await this.pbkdf2Async(password, this.salt, this.iterations, this.keylen, this.algorithm);
    return hashPass.toString('hex');
  }

  async hashValidation(password: string, hash: string): Promise<boolean> {
    const hashFromPassword: Buffer = await this.pbkdf2Async(
      password,
      this.salt,
      this.iterations,
      this.keylen,
      this.algorithm,
    );
    return hash === hashFromPassword.toString('hex');
  }

  async generateReferralCode(email: string) {
    const refCode = randomBytes(6).toString('base64url');
    if (await this.cacheService.get(refCode)) {
      this.generateReferralCode(email);
    }
    this.cacheService.set(refCode, email);
    return refCode;
  }
}
