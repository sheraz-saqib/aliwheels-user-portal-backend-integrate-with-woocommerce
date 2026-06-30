import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import authConfig from '../../configs/auth.config';
import { AccountsService } from '../../modules/accounts/accounts.service';
import { CookiesService } from '../../utils/cookies/cookies.service';
import { CryptoService } from '../../utils/crypto/crypto.service';
import { TokensService } from '../../utils/tokens/tokens.service';
import { TokenPayload } from '../../utils/tokens/interfaces/token-payload.interface';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly tokensService: TokensService,
    private readonly cryptoService: CryptoService,
    private readonly accountsService: AccountsService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async use(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { accessToken, refreshToken } =
      this.cookiesService.getAuthCookies(req);

    if (accessToken) {
      const payload = this.tryVerifyAccessToken(accessToken);

      if (payload) {
        req.user = payload;
        return next();
      }
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Authentication required');
    }

    const decoded = this.tryVerifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new UnauthorizedException('Session expired, please login again');
    }

    const account = await this.accountsService.getAccountById(decoded.id);

    if (!account || !account.isActive) {
      throw new UnauthorizedException('Session expired, please login again');
    }

    const storedHash = account.refreshToken?.hashValue;
    const storedExpiresAt = account.refreshToken?.expiresAt;

    if (!storedHash || !storedExpiresAt || storedExpiresAt < new Date()) {
      throw new UnauthorizedException('Session expired, please login again');
    }

    const isValidRefreshToken = await this.cryptoService.hashCompare(
      refreshToken,
      storedHash,
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Session expired, please login again');
    }

    const payload: TokenPayload = {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
    };

    const newAccessToken = this.tokensService.generateAccessToken(payload);
    const newRefreshToken = this.tokensService.generateRefreshToken(payload);

    await this.accountsService.updateRefreshToken(account, {
      hashValue: await this.cryptoService.hash(newRefreshToken),
      expiresAt: new Date(
        Date.now() +
          this.cryptoService.stringToMilliSecond(
            this.config.jwt.refreshTokenExpireIn,
          ),
      ),
    });

    this.cookiesService.setAuthCookies(res, newAccessToken, newRefreshToken);

    req.user = payload;
    next();
  }

  private tryVerifyAccessToken(token: string): TokenPayload | null {
    try {
      return this.tokensService.verifyAccessToken(token);
    } catch {
      return null;
    }
  }

  private tryVerifyRefreshToken(token: string): TokenPayload | null {
    try {
      return this.tokensService.verifyRefreshToken(token);
    } catch {
      return null;
    }
  }
}
