import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user.entity';
import { Request as ReqDecorator } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateAccessToken(user);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({ message: 'Login successful', token });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({ message: 'Logout successful' });
  }

  @Post('register')
  async register(@Body() body) {
    const { username, password } = body;

    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    try {
      const newUser = await this.userService.create(username, password, UserRole.USER);
      return newUser;
    } catch (error) {
      console.error('Error during registration:', error);
      throw new InternalServerErrorException('Registration failed. Please try again later.');
    }
  }
}
