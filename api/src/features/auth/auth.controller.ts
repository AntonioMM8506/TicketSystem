import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
// Import guards
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}
  //End of constructor

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    this.eventEmitter.emit('user.welcome', {
      name: createUserDto.name,
      email: createUserDto.email,
    });
    return this.authService.signUp(createUserDto);
  } //End of signup

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  } //End of signin

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  } //End of logout

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  } //End of refreshTokens

  @UseGuards(RefreshTokenGuard)
  @Get('refreshByEmail')
  refreshTokensByEmail(@Req() req: Request) {
    const userId = req.user['email'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.getEmailByRefreshToken(userId, refreshToken);
  } //End of refreshTokens

  @Post('resetPassword')
  async resetPassword(@Body() body: UpdateUserDto) {
    const tok = await this.authService.resetToken(body.email);

    this.eventEmitter.emit('user.reset-password', {
      name: body.name,
      email: body.email,
      link: tok,
    });

    const updatedPwd = await this.authService.resetPassword(body);
    return updatedPwd;
  } //End of resetPassword
} //End of AuthController
