import { User } from '@/app/utils/types';
import EditButton from './EditButton';
import Loading from './Loading';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string;
  onEditUser: (id: number) => void;
}

const UsersList: React.FC<UserListProps> = ({
  users,
  loading,
  error,
  onEditUser,
}) => {
  if (loading) {
    return <Loading message="Loading characters..." size="sm" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <ul className="space-y-2 px-0">
      {users.map((user) => (
        <li
          key={user.id}
          className="bg-gray-100 p-3 text-gray-600 rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-between"
        >
          <div>
            <strong className="text-gray-700">{user.username}</strong>
          </div>
          <EditButton onClick={() => onEditUser(user.id)} />
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
