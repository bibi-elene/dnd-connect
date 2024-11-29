import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express'; // Import Express Response
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/user.entity';
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
    console.log('Login endpoint hit with body:', body);

    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User validated:', user);

    // Generate the token
    const token = await this.authService.login(user);
    console.log('Generated token:', token);

    // Set the cookie with the token
    res.cookie('access_token', token.access_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('Cookie set, sending response.');

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
    console.log('User from JWT:', req.user);
    if (!req.user) {
      throw new UnauthorizedException('User not found in request.');
    }
    return req.user;
  }
}
