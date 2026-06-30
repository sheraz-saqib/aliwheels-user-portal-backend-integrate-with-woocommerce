import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from '../../utils/crypto/crypto.service';
import { Role } from '../../common/enums/role.enum';
import { Account, AccountDocument } from './schemas/account.schema';
import {
  CreateAccountOptions,
  GetAccountByEmailOptions,
  UpdateRefreshTokenOptions,
  UpdateVerificationSessionOptions,
} from './@types/account.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async getAccountByEmail(
    options: GetAccountByEmailOptions,
  ): Promise<AccountDocument | null> {
    const query = this.accountModel.findOne({ email: options.email });

    if (options.withPassword) {
      query.select('+password');
    }

    return await query.exec();
  }

  async getAccountById(id: string): Promise<AccountDocument | null> {
    return await this.accountModel.findById(id).exec();
  }

  async getAccountWhereIdAndSessionId(
    id: string,
    sessionId: string,
  ): Promise<AccountDocument | null> {
    return await this.accountModel
      .findOne({ _id: id, 'verification.sessionId': sessionId })
      .exec();
  }

  async createAccount(options: CreateAccountOptions): Promise<AccountDocument> {
    const hashedPassword = await this.cryptoService.hash(options.password);

    return await this.accountModel.create({
      email: options.email,
      name: options.name,
      password: hashedPassword,
      role: Role.USER,
      isVerified: false,
      isActive: true,
    });
  }

  async updateVerificationSessionId(
    account: AccountDocument,
    options: UpdateVerificationSessionOptions,
  ): Promise<void> {
    account.verification = { sessionId: options.sessionId };
    await account.save();
  }

  async updateAccountVerifiedStatus(
    account: AccountDocument,
    isVerified: boolean,
  ): Promise<void> {
    account.isVerified = isVerified;
    await account.save();
  }

  async updateRefreshToken(
    account: AccountDocument,
    options: UpdateRefreshTokenOptions,
  ): Promise<void> {
    account.refreshToken = {
      hashValue: options.hashValue,
      expiresAt: options.expiresAt,
    };
    await account.save();
  }

  async listAccounts(): Promise<AccountDocument[]> {
    return await this.accountModel.find().exec();
  }

  async updateAccountRole(id: string, role: Role): Promise<AccountDocument> {
    const account = await this.accountModel.findById(id).exec();

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.role = role;
    await account.save();

    return account;
  }
}
