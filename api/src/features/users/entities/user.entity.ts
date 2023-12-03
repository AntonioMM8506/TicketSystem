// Import core libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  gender: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  accessToken?: string;

  @Prop({
    default: false,
  })
  validatedAccount: boolean;

  @Prop({
    default: new Date(),
  })
  birthdate: Date;

  @Prop({
    default: new Date(),
  })
  lastconnection: Date;

  @Prop({
    default: new Date(),
  })
  lastupdate: Date;

  @Prop({
    enum: ['admin', 'finalUser'],
    default: 'admin',
  })
  accountType: string;
} //End of class User

export const UserSchema = SchemaFactory.createForClass(User);
