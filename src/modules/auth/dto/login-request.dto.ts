import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;
}