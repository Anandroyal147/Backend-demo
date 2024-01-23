import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/user.entity';

@Schema()
export class Organization {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export type OrganizationDocument = Organization & Document;

export const organizationSchema = SchemaFactory.createForClass(Organization);
