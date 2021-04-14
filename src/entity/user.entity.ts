import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";
import { Role } from "src/modules/user/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export const DB_USER = "users";

@Schema({
  collection: DB_USER,
  timestamps: true,
})
export class User {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  phone: string;

  @ApiProperty()
  @Prop({ required: true })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.comparePassword = async function comparePassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.get("password"));
};

export interface UserDocument extends User, Document {
  comparePassword(password: string): Promise<boolean>,
}

