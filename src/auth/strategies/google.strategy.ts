/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new UnauthorizedException('Mail no provisto');
    }

    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.register({
        name: name?.givenName ?? 'Google User',
        email,
        password: '', // o algún marcador
        profile_picture: photos?.[0]?.value ?? '',
        role: 'customer',
        active: true,
      });
    }

    done(null, user);
  }
}
