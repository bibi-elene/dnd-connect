import { UserRole } from '../user/user.entity';

export const isAdmin = (userRole: string) => Boolean(userRole === UserRole.ADMIN);
