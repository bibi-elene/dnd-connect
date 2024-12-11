import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(@Query('limit') limit?: number): Promise<User[]> {
    return this.userService.findAllUsers(limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('username') username?: string,
    @Body('role') role?: UserRole,
  ) {
    return this.userService.updateUser(id, username, role);
  }
}
