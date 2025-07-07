/* eslint-disable prettier/prettier */
// src/users/dto/create-user.dto.ts
import {
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';


export class LoginUserDto {

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

}
