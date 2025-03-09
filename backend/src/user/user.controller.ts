import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(@Query('limit') limit?: number): Promise<User[]> {
    return this.userService.findAllUsers(limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    console.log('starting point');
    if (!req.user) {
      throw new UnauthorizedException('User not found in request.');
    }

    const fullUser = await this.userService.findUserById(req.user.id);
    console.log(fullUser, 'full user');

    return fullUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.user.id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
