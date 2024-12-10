import { UserRole } from 'src/user/user.entity';

export const isAdmin = (userRole: string) => Boolean(userRole === UserRole.ADMIN);
