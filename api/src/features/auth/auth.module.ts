import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { UsersModule } from '@features/users/users.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { AccessTokenGuard, RefreshTokenGuard } from './guards'

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard
  ]
})
export class AuthModule {}
