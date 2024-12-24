import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ErrorMessages } from '../utils/errorMessages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);
      if (!user) {
        throw new UnauthorizedException(ErrorMessages.USER_NOT_FOUND);
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error in validateUser:', error.message);
      throw new InternalServerErrorException('Something went wrong. Please try again later.');
    }
  }

  async generateAccessToken(user: any) {
    try {
      const payload = { username: user.username, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error in generateAccessToken:', error.message);
      throw new InternalServerErrorException(
        'Could not generate access token. Please try again later.',
      );
    }
  }
}
