import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from "bcrypt"

export const DB_USER = "users"

@Schema({
  collection: DB_USER,
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
  @Prop({required: true})
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.comparePassword = async function comparePassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.get("password"));
}

export interface UserDocument extends User, Document {
  comparePassword(password: string): Promise<boolean>,
}
