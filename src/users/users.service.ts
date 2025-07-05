/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository){}

    findByEmail(email: string): Promise<User | null>{
        return this.userRepository.findByEmail(email);
    }
    
    register(userData: Partial<CreateUserDto>){
        return this.userRepository.create(userData);
    }
}
