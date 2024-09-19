import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log('Invalid credentials'); // TODO: create proper logger
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('register')
  async register(@Body() body) {
    const { username, password } = body;
    return this.userService.create(username, password, UserRole.USER);
  }
}
