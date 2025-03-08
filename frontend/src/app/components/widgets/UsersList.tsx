'use client';

import { User } from '@/app/utils/types';
import Loading from './Loading';
import EditButton from './EditButton';
import { useNavigate } from '@/app/utils/navigation';
import { TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string;
}

const UsersList: React.FC<UserListProps> = ({ users, loading, error }) => {
  const { goToUser } = useNavigate();

  if (loading) {
    return <Loading message="Loading users..." size="sm" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </tr>
        </thead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <EditButton onEdit={() => goToUser(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default UsersList;
