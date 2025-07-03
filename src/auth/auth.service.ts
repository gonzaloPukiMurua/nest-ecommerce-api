/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: UserRepository
    ){}
    register(){

    }

    login(){
        
    }
}
