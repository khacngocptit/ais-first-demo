import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './modules/auth/auth.service';
import { Config } from './modules/auth/config';
import { DB_USER, UserDocument } from './schema/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, @InjectModel(DB_USER) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.JwtSecret,
        });
    }

    async validate(payload: any) {
        const user = await this.userModel.findOne({_id: payload.sub});
        return user;
    }
}