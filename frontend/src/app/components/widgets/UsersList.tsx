import { User } from '@/app/utils/types';
import Loading from './Loading';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from '@/app/utils/navigation';
import EditButton from './EditButton';

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
    return <p className="text-danger">{error}</p>;
  }

  return (
    <ListGroup>
      {users.map((user) => (
        <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
          <div>
            <strong className="text-dark">{user.username}</strong>
          </div>
          <EditButton onEdit={() => goToUser(user.id)} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UsersList;
