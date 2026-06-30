import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationMessageDocument = HydratedDocument<NotificationMessage>;

@Schema({ timestamps: true })
export class NotificationMessage {
  @Prop({ type: Types.ObjectId, ref: 'NotificationThread', required: true })
  threadId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: null })
  readAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export const NotificationMessageSchema =
  SchemaFactory.createForClass(NotificationMessage);
