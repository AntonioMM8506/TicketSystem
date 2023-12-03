import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@features/users/users.module';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  ResetTokenStrategy,
} from './strategies';
import { AccessTokenGuard, RefreshTokenGuard, ResetTokenGuard } from './guards';
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ResetTokenStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
    ResetTokenGuard,
    TypedEventEmitter,
  ],
  exports: [AuthService],
})
export class AuthModule {}
