import { User } from '@/app/utils/types';
import EditButton from './EditButton';
import Loading from './Loading';
import { ListGroup, Button } from 'react-bootstrap';

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
        <ListGroup.Item
          key={user.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong className="text-dark">{user.username}</strong>
          </div>
          <Button variant="outline-primary" size="sm" onClick={() => onEditUser(user.id)}>
            Edit
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UsersList;
