import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}
  //End of constructor

  @Post('signup')
  @ApiOperation({ summary: 'Validate a new user can be created' })
  @ApiResponse({
    status: 200,
    description:
      'Validate user can be created given the Body. Returns the access tokens. If the given email already exists, then the user cannot be created.',
  })
  signup(@Body() createUserDto: CreateUserDto) {
    this.eventEmitter.emit('user.welcome', {
      name: createUserDto.name,
      email: createUserDto.email,
    });
    return this.authService.signUp(createUserDto);
  } //End of signup

  @Post('signin')
  @ApiOperation({ summary: 'Validate user credentials' })
  @ApiResponse({
    status: 200,
    description:
      'Validate user can log in given email and password as the Body. Password is validate through argon2.',
  })
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  } //End of signin

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiOperation({ summary: 'Validate user can Log Out' })
  @ApiResponse({
    status: 200,
    description:
      'User logs out given the acces token as a Request as an Authorization Header, so the generated tokens though SignIn or SignUp methods are no longer valid.',
  })
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  } //End of logout

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({
    summary: 'Auxiliar Method used to refresh the access Tokens given User Id',
  })
  @ApiResponse({
    status: 200,
    description:
      'Auxiliar Method used to generate a refresh token given the Request as an Authorization Header, so when the original token expires, the Refreshes Token can be the new one valid active token.',
  })
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  } //End of refreshTokens

  @UseGuards(RefreshTokenGuard)
  @Get('refreshByEmail')
  @ApiOperation({
    summary:
      'Auxiliar Method used to refresh the access Tokens given User Email',
  })
  @ApiResponse({
    status: 200,
    description:
      'Auxiliar Method used to generate a refresh token given the Request as an Authorization Header, so when the original token expires, the Refreshes Token can be the new one valid active token.',
  })
  refreshTokensByEmail(@Req() req: Request) {
    const userId = req.user['email'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.getEmailByRefreshToken(userId, refreshToken);
  } //End of refreshTokens

  @Post('resetPassword')
  @ApiOperation({ summary: 'Reset user password given a reset Token' })
  @ApiResponse({
    status: 201,
    description:
      'Updates password of the User gieven the Body, and triggers the send of an email so the user can reset their password using the given Token',
  })
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
