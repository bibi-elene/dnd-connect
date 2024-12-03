import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express'; // Import Express Response
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

    // const isProduction = process.env.NODE_ENV === 'production';
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('access_token', token.access_token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    // Return a success response
    return res.status(200).json({ message: 'Login successful', token });
  }

  @Post('register')
  async register(@Body() body) {
    const { username, password } = body;
    return this.userService.create(username, password, UserRole.USER);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@ReqDecorator() req) {
    if (!req.user) {
      throw new UnauthorizedException('User not found in request.');
    }
    return req.user;
  }
}
