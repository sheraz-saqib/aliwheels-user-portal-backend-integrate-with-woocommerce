import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../../common/enums/role.enum';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ _id: false })
class Verification {
  @Prop()
  sessionId?: string;
}

@Schema({ _id: false })
class RefreshToken {
  @Prop()
  hashValue?: string;

  @Prop()
  expiresAt?: Date;
}

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Verification, default: {} })
  verification: Verification;

  @Prop({ type: RefreshToken, default: {} })
  refreshToken: RefreshToken;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
