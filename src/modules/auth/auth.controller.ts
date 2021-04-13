import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserDocument } from "../../entity/user.entity";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req: Request) {
        const user = req.user as UserDocument;
        return this.authService.login(user);
    }
}
