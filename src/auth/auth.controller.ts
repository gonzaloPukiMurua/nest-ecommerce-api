/* eslint-disable prettier/prettier */
import { Controller, Req, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService){}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(){

    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request){
        return {
            message: 'user authenticated via Google',
            user: req.user,
        };
    }

    @Post('register')
    async register(@Body() userData: CreateUserDto){
        return this.authService.register(userData);
    }

    @Post('login')
    async login(@Body() userData: LoginUserDto){
        return this.authService.login(userData);
    }
}
