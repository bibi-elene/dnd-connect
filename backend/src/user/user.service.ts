import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(username: string, password: string, role: UserRole): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }

  async findAllUsers(limit?: number): Promise<User[]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.USER });

    if (limit) {
      queryBuilder.limit(limit);
    }

    const users = await queryBuilder.getMany();

    return users;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<void> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(id);
  }
}
