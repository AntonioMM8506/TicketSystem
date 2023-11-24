import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


type JwtPayload = {
  sub: string
  username: string
}

@Injectable()
//Extends from Passport Strategy in order to generate our current strategies
export class ResetTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    })
  }

  //passport validates that the given token is valid an unexpired
  validate(payload: JwtPayload) {
    return payload
  }
}
