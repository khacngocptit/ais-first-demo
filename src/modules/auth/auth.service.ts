import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_USER, UserDocument } from '../../schema/user.schema';
import { LoginResDto } from './dto/login-res.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.dto';
import { GetUserDTO } from '../user/dto/user-getuser.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(DB_USER) private userModel: Model<UserDocument>,
        private jwtSevice: JwtService,
        private userService: UserService
    ) { }

    async login(user: UserDocument): Promise<LoginResDto> {
        // TODO: return token
        const payload: JwtPayload = {
            sub: user._id,
        }
        const token = this.jwtSevice.sign(payload);
        return { token };
    }
    async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
        const user = await this.userService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
