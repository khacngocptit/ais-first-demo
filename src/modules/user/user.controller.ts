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
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "./role.enum";
import { Roles } from "./role.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { User, UserDocument } from "src/entity/user.entity";
import { Request } from "express";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }
  
  @Get()
  @ApiOkResponse({ type: [User] })
  @Roles(Role.Admin)
  // Get all user for admin
  async getAll(): Promise<User[]> {
    const result = await this.userService.getAll();
    return result;
  }

  @Post("create")
  @ApiOkResponse({ type: User })
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Delete("delete/:id")
  @ApiOkResponse({ type: User })
  @Roles(Role.Admin, Role.User)
  async deleteUser(@Param("id") id: string, @Req() req: Request): Promise<UserDocument> {
    const user: UserDocument = req.user as UserDocument;
    const result = this.userService.delete(id, user);
    return result;
  }

  @Put("update/:id")
  @ApiOkResponse({ type: User })
  @Roles(Role.Admin, Role.User)
  async updateUser(@Req() req: Request, @Param("id") id: string, @Body() updateUser: UpdateUserDto) {
    const user = req.user;
    const result = await this.userService.update(id, updateUser, user as UserDocument);
    return result;
  }
}
