import { ApiProperty } from "@nestjs/swagger";

export class JwtPayload {
    @ApiProperty()
    sub: string;
     @ApiProperty()
    exp?: string;
}