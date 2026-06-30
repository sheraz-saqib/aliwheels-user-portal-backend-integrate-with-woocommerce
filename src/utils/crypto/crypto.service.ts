import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(value: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(12);
      return await bcrypt.hash(value, salt);
    } catch {
      throw new InternalServerErrorException('Error while hashing the value');
    }
  }

  async hashCompare(value: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(value, hash);
    } catch {
      throw new InternalServerErrorException(
        'Error while comparing the hashed value',
      );
    }
  }

  stringToMilliSecond(time: string): number {
    const regex = /^(\d+)(ms|s|m|h|d)$/i;
    const match = time.match(regex);

    if (!match) {
      throw new Error(
        `Invalid time format: ${time}. Use: 7d, 1h, 30m, 500s, 100ms`,
      );
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 'ms':
        return value;
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 3600 * 1000;
      case 'd':
        return value * 86400 * 1000;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }
}
