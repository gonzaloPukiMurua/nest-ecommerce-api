/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async findByEmail(email: string): Promise<User | null>{
        return await this.userRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<CreateUserDto>): Promise<User>{
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
}
