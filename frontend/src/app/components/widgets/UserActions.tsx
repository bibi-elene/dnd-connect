import { Button, ButtonGroup } from 'react-bootstrap';

interface UserActionProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const UserActions: React.FC<UserActionProps> = ({ onViewAll, onCreate }) => (
  <ButtonGroup className="mb-5">
    <Button
      variant="primary"
      className="rounded me-2 btn-md-lg shadow rounded-lg bg-blue-500 hover:bg-blue-600 transition px-4 py-2"
      onClick={onViewAll}
    >
      View All Users
    </Button>
    {onCreate && (
      <Button
        variant="success"
        className="btn-sm rounded btn-md-lg shadow rounded-lg transition px-4 py-2"
        onClick={onCreate}
      >
        Create New User
      </Button>
    )}
  </ButtonGroup>
);

export default UserActions;
