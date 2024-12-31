import { User } from '@/app/utils/types';
import Loading from './Loading';
import { ListGroup } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string;
  onEditUser: (id: number) => void;
}

const UsersList: React.FC<UserListProps> = ({ users, loading, error, onEditUser }) => {
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
          <button className="edit-button" onClick={() => onEditUser(user.id)}>
            <FaPencilAlt />
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UsersList;
