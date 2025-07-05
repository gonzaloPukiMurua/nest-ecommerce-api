import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UserRepository } from '../users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, GoogleStrategy, UserRepository, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
