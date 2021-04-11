import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { DB_USER, UserDocument } from '../../schema/user.schema';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(DB_USER)
    private readonly userModel: Model<UserDocument>,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user) {
      const matchPassword = await user.comparePassword(password);
      if (matchPassword === true) {
        return user;
      } else {
        throw new UnauthorizedException("Wrong password");
      }
    } else {
      return undefined;
    }
  }
}