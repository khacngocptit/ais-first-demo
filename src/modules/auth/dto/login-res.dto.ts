import { ApiProperty } from "@nestjs/swagger";

export class LoginResDto {
    @ApiProperty()
    token: string;
}