import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    create(username: string, password: string, role: UserRole): Promise<User>;
    findAllUsers(): Promise<User[]>;
}
