import { Button, ButtonGroup } from 'react-bootstrap';

interface UserActionProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const UserActions: React.FC<UserActionProps> = ({ onViewAll, onCreate }) => (
  <ButtonGroup className="mb-5">
    <Button variant="primary" className="btn-sm btn-md-lg" onClick={onViewAll}>
      View All Users
    </Button>
    {onCreate && (
      <Button variant="success" className="btn-sm btn-md-lg" onClick={onCreate}>
        Create New User
      </Button>
    )}
  </ButtonGroup>
);

export default UserActions;
