import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { DB_USER, UserSchema } from "../../entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guards/roles.guard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DB_USER, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RolesGuard,
  ],
})
export class UserModule {}
