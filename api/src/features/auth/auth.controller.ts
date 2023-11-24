import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { AuthDto } from './dto/auth.dto'
import { UpdatePasswordDto } from '../users/dto/update-password.dto'
import { TypedEventEmitter } from '@app/event-emitter/typed-event-emitter.class';
import { UpdateUserDto } from '../users/dto/update-user.dto'

// Import guards
import { AccessTokenGuard, RefreshTokenGuard, ResetTokenGuard } from './guards'

// Import user files
import { CreateUserDto } from '@features/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly eventEmitter: TypedEventEmitter) {}
  //End of constructor


  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }//End of signup


  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }//End of signin


  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub'])
  }//End of logout


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }//End of refreshTokens

  //-----------------
  /*
  @UseGuards(ResetTokenGuard)
  @Get('reset')
  resetToken(@Req() req: Request){
    const userId = req.user['sub']
    const email =  req.user['email']
    return this.authService.resetToken(userId, email);
  }
  */

  @Post('resetPassword')
  async resetPassword(@Body() body: UpdateUserDto){

    const tok = await this.authService.resetPassword(body);

    this.eventEmitter.emit('user.reset-password', {
      name: body.name,
      email: body.email,
      link: tok
      
    })

  }//End of resetPassword


}//End of AuthController
