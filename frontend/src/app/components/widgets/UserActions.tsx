import { ButtonGroup } from 'react-bootstrap';

interface UserActionProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const UserActions: React.FC<UserActionProps> = ({ onViewAll, onCreate }) => (
  <ButtonGroup className="mb-5">
    <button className="primary-custom-button" onClick={onViewAll}>
      View All Users
    </button>
    {onCreate && (
      <button className="secondary-custom-button" onClick={onViewAll}>
        Create New User
      </button>
    )}
  </ButtonGroup>
);

export default UserActions;
