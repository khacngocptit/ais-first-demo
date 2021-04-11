import { ApiProperty } from "@nestjs/swagger";

export class GetUserDTO {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phone: string;
}
