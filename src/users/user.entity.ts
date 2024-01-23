// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ default: () => new Date().toISOString() })
  createdAt: Date;

  @Prop({ default: () => new Date().toISOString() })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  role: string;
}

export type UserDocument = User & Document;

export const userSchema = SchemaFactory.createForClass(User);
