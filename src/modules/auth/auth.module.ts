import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema, DB_USER } from '../../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Config } from './config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from '../../jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DB_USER, schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Config.JwtSecret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService,JwtStrategy]
})
export class AuthModule { }
