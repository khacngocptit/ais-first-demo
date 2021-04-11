import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, DB_USER } from '../../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { GetUserDTO } from './dto/user-getuser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_USER) private userModel: Model<UserDocument>,
  ) { }


  // Get All
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Create User
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const userExist = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (userExist) {
      throw new HttpException('GoneException', HttpStatus.GONE);
    } else {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }
  }
  // Delete User
  async delete(id, user: any): Promise<any> {
    if(user.role === 'user') {
      if(id.localeCompare(user._id) === 0) {
        const res = await this.userModel.deleteOne({_id: id});
        return res;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } 
    else if (user.role === 'admin') {

    }
    
  }
  // Update User
  async update(id, updateUser: UpdateUserDto, user: any): Promise<any> {
    
    if(user.role === 'user') {
      
      if(id.localeCompare(user._id) === 0) {
        console.log(user)
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(updateUser.password, saltOrRounds);
        updateUser.password = hash;
        const result = await this.userModel.updateOne({_id: id}, updateUser);
        
        return await this.userModel.findById({_id:id });
      }
      else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        
      }
    } else if(user.role === 'admin') {
      const result = this.userModel.updateOne({_id:id}, updateUser);
      return result;
    }
    
  }

  async findByPayload({ username }: any): Promise<GetUserDTO> {
    return await this.userModel.findOne({ username: username });
  }

}
