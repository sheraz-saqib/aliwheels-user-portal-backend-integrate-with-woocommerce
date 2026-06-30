import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationThreadDocument = HydratedDocument<NotificationThread>;

@Schema({ timestamps: true })
export class NotificationThread {
  @Prop({ required: true, trim: true })
  subject: string;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  participantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  createdBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const NotificationThreadSchema =
  SchemaFactory.createForClass(NotificationThread);
