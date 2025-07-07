/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserPayload } from './interfaces/google.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise<User | null>{
        const user = await this.userService.findByEmail(email);
        if( user && await bcrypt.compare(password, user.password)){
            return user;
        }
        return null;
    }

    getToken(payload: { sub: number, email: string, role: string}){

        if (!this.jwtService) {
            throw new UnauthorizedException('JwtService no está disponible');
        }

        return this.jwtService.sign(payload)
    }

    async validateOrCreateUserFromGoogle(profile: GoogleUserPayload): Promise<User>
    {
        const { email, firstName, lastName, picture } = profile;

        let user = await this.userService.findByEmail(profile.email);
        if(!user){
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newUser = {
                email,
                name: `${firstName} ${lastName}`.trim(),
                password: hashedPassword,
                profile_picture: picture,
                role: 'user',
            };

            user = await this.userService.register(newUser as CreateUserDto);
        }

        return user;
    }

    async register(userData: CreateUserDto): Promise<User>{
        const { password, confirm_password, ...rest} = userData;
        if(password !== confirm_password) {
            throw new BadRequestException('Password does not match.');
        } 
        const hashedPassword = await bcrypt.hash(password, 10);

        const userToCreate = {
            ...rest,
            password: hashedPassword,
        };

        return this.userService.register(userToCreate);
    }

    async login(userData: LoginUserDto): Promise<{ access_token: string }>{
        const user = await this.userService.findByEmail(userData.email);
        
        if(!user){
            throw new UnauthorizedException('Usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(userData.password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const access_token = this.getToken({ sub: user.id, email: user.email, role: user.role});

        if(!access_token){
             throw new UnauthorizedException('No se pudo generar el token de acceso');
        }

        return { access_token };
    }
}
