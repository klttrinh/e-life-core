import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { IAuthProvider } from './iauth-provider';

export class ApiTokenProvider implements IAuthProvider {
  constructor(private privateKey: string, private apiKey: string) {}

  signJwt(path: string, bodyJson?: any): string {
    const token = jwt.sign(
      {
        uri: path,
        nonce: uuid(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 55,
        sub: this.apiKey,
        bodyHash: crypto
          .createHash('sha256')
          .update(JSON.stringify(bodyJson || ''))
          .digest()
          .toString('hex'),
      } as any,
      this.privateKey,
      { algorithm: 'RS256' },
    );

    return token;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
