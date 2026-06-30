import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import authConfig from '../../configs/auth.config';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class CookiesService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly cryptoService: CryptoService,
  ) {}

  setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: this.config.isProduction,
      sameSite: this.config.isProduction ? 'none' : 'lax',
      maxAge: this.cryptoService.stringToMilliSecond(
        this.config.jwt.accessTokenExpireIn,
      ),
      path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.config.isProduction,
      sameSite: this.config.isProduction ? 'none' : 'lax',
      maxAge: this.cryptoService.stringToMilliSecond(
        this.config.jwt.refreshTokenExpireIn,
      ),
      path: '/',
    });
  }

  getAuthCookies(req: Request): {
    accessToken?: string;
    refreshToken?: string;
  } {
    const cookies = (req.cookies ?? {}) as Record<string, string>;

    return {
      accessToken: cookies.access_token,
      refreshToken: cookies.refresh_token,
    };
  }

  clearAuthCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: this.config.isProduction,
      sameSite: this.config.isProduction ? 'none' : 'lax',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: this.config.isProduction,
      sameSite: this.config.isProduction ? 'none' : 'lax',
      path: '/',
    });
  }
}
