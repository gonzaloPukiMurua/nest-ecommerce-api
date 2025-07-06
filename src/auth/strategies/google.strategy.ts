/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback, StrategyOptions } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { GoogleUserPayload } from '../interfaces/google.interface';
import { User } from 'src/users/users.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const options: StrategyOptions = {
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    };
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {

    const { name, emails, photos } = profile;

    const email: string = emails?.[0]?.value ?? '';
    const firstName: string = name?.givenName ?? '';
    const lastName: string = name?.familyName ?? '';
    const picture: string = photos?.[0]?.value ?? '';

    if(!email){
      return done(new Error('No hay email provisto por google'), undefined);
    }

    const user: GoogleUserPayload = {
      email,
      firstName,
      lastName,
      picture,
      accessToken,
    };

    const authenticatedUser: User = await this.authService.validateOrCreateUserFromGoogle(user);

    done(null, authenticatedUser);
  }
}
