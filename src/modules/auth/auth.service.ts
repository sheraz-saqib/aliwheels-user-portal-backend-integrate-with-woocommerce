import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import type { Response } from 'express';
import authConfig from '../../configs/auth.config';
import { AccountDocument } from '../accounts/schemas/account.schema';
import { AccountsService } from '../accounts/accounts.service';
import { CookiesService } from '../../utils/cookies/cookies.service';
import { CryptoService } from '../../utils/crypto/crypto.service';
import { MailerService } from '../../utils/mailer/mailer.service';
import { TokensService } from '../../utils/tokens/tokens.service';
import { TokenPayload } from '../../utils/tokens/interfaces/token-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthResponse } from './@types/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly mailerService: MailerService,
    private readonly cryptoService: CryptoService,
    private readonly tokensService: TokensService,
    private readonly cookiesService: CookiesService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingAccount = await this.accountsService.getAccountByEmail({
      email: dto.email,
    });

    if (existingAccount) {
      throw new ConflictException('Email already registered');
    }

    const account = await this.accountsService.createAccount({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });

    await this.sendVerificationEmail(account);

    return this.toAuthResponse(account);
  }

  async login(res: Response, dto: LoginDto): Promise<AuthResponse> {
    const account = await this.accountsService.getAccountByEmail({
      email: dto.email,
      withPassword: true,
    });

    if (!account) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!account.isActive) {
      throw new UnauthorizedException('Your account is blocked');
    }

    if (!account.isVerified) {
      await this.sendVerificationEmail(account);
      throw new ForbiddenException(
        'Account not verified. Verification email sent.',
      );
    }

    const isValidPassword = await this.cryptoService.hashCompare(
      dto.password,
      account.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.issueTokens(res, account);

    return this.toAuthResponse(account);
  }

  async verifyEmail(res: Response, dto: VerifyEmailDto): Promise<string> {
    const decoded = this.tokensService.verifyVerificationToken(dto.token);

    const account = await this.accountsService.getAccountWhereIdAndSessionId(
      decoded.id,
      decoded.sessionId,
    );

    if (!account) {
      throw new UnauthorizedException('Verification link has expired');
    }

    if (account.isVerified) {
      throw new BadRequestException('Account is already verified');
    }

    await this.accountsService.updateAccountVerifiedStatus(account, true);
    await this.issueTokens(res, account);

    return 'Your account has been verified';
  }

  async me(user?: TokenPayload): Promise<AuthResponse | null> {
    if (!user) {
      return null;
    }

    const account = await this.accountsService.getAccountById(user.id);

    if (!account) {
      return null;
    }

    return this.toAuthResponse(account);
  }

  private async sendVerificationEmail(account: AccountDocument): Promise<void> {
    const sessionId = randomUUID();

    await this.accountsService.updateVerificationSessionId(account, {
      sessionId,
    });

    const token = this.tokensService.generateVerificationToken({
      id: account.id,
      sessionId,
    });

    await this.mailerService.sendVerificationEmail({
      to: account.email,
      token,
    });
  }

  private async issueTokens(
    res: Response,
    account: AccountDocument,
  ): Promise<void> {
    const payload: TokenPayload = {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
    };

    const accessToken = this.tokensService.generateAccessToken(payload);
    const refreshToken = this.tokensService.generateRefreshToken(payload);

    await this.accountsService.updateRefreshToken(account, {
      hashValue: await this.cryptoService.hash(refreshToken),
      expiresAt: new Date(
        Date.now() +
          this.cryptoService.stringToMilliSecond(
            this.config.jwt.refreshTokenExpireIn,
          ),
      ),
    });

    this.cookiesService.setAuthCookies(res, accessToken, refreshToken);
  }

  private toAuthResponse(account: AccountDocument): AuthResponse {
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
      isVerified: account.isVerified,
    };
  }
}
