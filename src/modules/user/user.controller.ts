import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './role.enum';
import { Roles } from './role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { DB_USER, User, UserDocument } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService, @InjectModel(DB_USER) private userModel: Model<UserDocument>
    ) {}
  @Get()
  @Roles(Role.Admin)
  // Get all user for admin
  async getAll(@Req() req) {
    const result = await this.userService.getAll();
    return result;
  }
  
  @Post('create')
  
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Delete('delete/:id')
  @Roles(Role.Admin, Role.User)
  async deleteUser(@Param('id') id: string, @Req() req: Request) {
    const user = req.user
    const result = this.userService.delete(id, user);
    return result;
  }

  @Put('update/:id')
  @Roles(Role.Admin, Role.User)
  async updateUser(@Req() req: Request, @Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    const user = req.user;
    const result = await this.userService.update(id, updateUser, user);
    console.log(result)
    return result;
  }  
}
