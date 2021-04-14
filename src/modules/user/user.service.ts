import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument, DB_USER } from "../../entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { Role } from "./role.enum";
import { GetUserDTO } from "./dto/user-getuser.dto";
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

    const userExist = await this.userModel.exists({
      username: createUserDto.username,
    });
    if (userExist) {
      throw new HttpException("GoneException", HttpStatus.GONE);
    } else {
      createUserDto.role = Role.User;
      return this.userModel.create(createUserDto);
    }
  }
  // Delete User
  async delete(id: string, user: UserDocument): Promise<any> {
    if (user.role === Role.User) {
      if (id === String(user._id)) {
        const res = await this.userModel.deleteOne({ _id: id });
        return res;
      } else {
        return null;
      }
    } 
    else if (user.role === Role.Admin) {
      const res = await this.userModel.deleteOne({ _id: id });
      return res;
    }
    
  }
  // Update User
  async update(id: string, updateUser: UpdateUserDto, user: UserDocument): Promise<UserDocument> {
    if (user.role === Role.User) {
      if (id === String(user._id)) {
        const result = this.userModel.findByIdAndUpdate(id, updateUser);
        return result;
      }
      else {
        throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
      }
    } else if (user.role === Role.Admin) {
      const result = this.userModel.findByIdAndUpdate(id, updateUser);
      return result;
    }
  }

  async findByPayload({ username }: any): Promise<GetUserDTO> {
    return this.userModel.findOne({ username: username });
  }

}
