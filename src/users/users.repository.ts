/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async findByEmail(email: string): Promise<User | null>{
        return this.userRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>): Promise<User>{
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
}
