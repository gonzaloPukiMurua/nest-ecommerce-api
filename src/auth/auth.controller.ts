/* eslint-disable prettier/prettier */
import { Controller, Req, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService){}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(){

    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req){
        return {
            message: 'user authenticated via Google',
            user: req.user,
        };
    }

    @Post('register')
    async register(){
        return await this.authService.register;
    }
}
