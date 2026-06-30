import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import authConfig from '../../configs/auth.config';
import {
  TokenPayload,
  VerifyTokenPayload,
} from './interfaces/token-payload.interface';

const asExpiresIn = (value: string): JwtSignOptions['expiresIn'] =>
  value as unknown as JwtSignOptions['expiresIn'];

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.jwt.accessTokenSecret,
      expiresIn: asExpiresIn(this.config.jwt.accessTokenExpireIn),
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.jwt.refreshTokenSecret,
      expiresIn: asExpiresIn(this.config.jwt.refreshTokenExpireIn),
    });
  }

  generateVerificationToken(payload: VerifyTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.jwt.verifyTokenSecret,
      expiresIn: asExpiresIn(this.config.jwt.verifyTokenExpireIn),
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.jwt.accessTokenSecret,
      });
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.jwt.refreshTokenSecret,
      });
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }

  verifyVerificationToken(token: string): VerifyTokenPayload {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.jwt.verifyTokenSecret,
      });
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
