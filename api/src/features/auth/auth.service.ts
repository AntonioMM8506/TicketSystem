import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'; 
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { UsersService } from '@features/users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findByEmail(createUserDto.email)
    if (userExists) {
      throw new BadRequestException('User already exists!')
    }

    // Hash password
    const hash = await this.hasData(createUserDto.password)
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    })
    // Get tokens
    const tokens = await this.getTokens(newUser._id, newUser.email)
    await this.updateRefreshToken(newUser._id, tokens.refreshToken)
    return tokens
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.userService.findByEmail(data.email)
    //console.log(data)
    if (!user) throw new BadRequestException('User does not exists')
    const passwordMatches = await argon2.verify(user.password, data.password)
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect')
    }
    const tokens = await this.getTokens(user._id, user.email)
    await this.updateRefreshToken(user._id, tokens.refreshToken)
    return tokens
  }

  async logout(userId: string) {
    return this.userService.updateToken(userId, { refreshToken: null, lastconnection: new Date()})
  }

  async hasData(data: string) {
    return await argon2.hash(data)
  }

  async updateRefreshToken(userId: any, refreshToken: string) {
    const hashedRefreshToken = await this.hasData(refreshToken)

    

    await this.userService.updateToken(userId, {
      refreshToken: hashedRefreshToken, 
      //lastconnection: new Date()
      lastconnection: (await this.userService.findOne(userId)).lastconnection
    })
  }

  async getTokens(userId: any, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '2h',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshTokens(userId: any, refreshToken: string) {
    const user = await this.userService.findOne(userId)

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    )

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

}//End of AuthService
