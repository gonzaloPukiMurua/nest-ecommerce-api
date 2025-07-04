/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise<User | null>{
        const user = await this.userRepository.findByEmail(email);
        if( user && await bcrypt.compare(password, user.password)){
            return user;
        }
        return null;
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
        const user = await this.userRepository.findByEmail(userData.email);
        if(!user){
            throw new UnauthorizedException('Usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(userData.password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        
        const payload = { sub: user.id, email: user.email, role: user.role};
        if (!this.jwtService) {
            throw new UnauthorizedException('JwtService no está disponible');
        }
        const access_token = this.jwtService.sign(payload);

        if(!access_token){
             throw new UnauthorizedException('No se pudo generar el token de acceso');
        }

        return { access_token };
    }
}
