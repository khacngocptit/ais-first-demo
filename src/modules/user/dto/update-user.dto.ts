import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phone: string;
}
