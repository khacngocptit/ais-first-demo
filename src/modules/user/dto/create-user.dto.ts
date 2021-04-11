import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
   role: string;
}