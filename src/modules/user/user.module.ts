/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_USER, UserSchema , User, UserDocument } from "../../entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RolesGuard } from "./guards/roles.guard";
import * as bcrypt from "bcrypt";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{ 
      name: DB_USER, 
      useFactory:() => {
        const userSchema = UserSchema;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        userSchema.pre<UserDocument>("save",async function (next: Function) {
          const user = this;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
          next();
        });
        return userSchema;
      },
     }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RolesGuard,
  ],
})
export class UserModule {}
