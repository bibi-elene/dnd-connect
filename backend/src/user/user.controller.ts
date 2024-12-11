import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<any> {
    return this.userService.findAllUsers();
  }
}
