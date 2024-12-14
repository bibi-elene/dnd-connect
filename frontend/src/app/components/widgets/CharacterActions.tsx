import { Button, ButtonGroup } from 'react-bootstrap';

interface CharacterActionsProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onViewAll, onCreate }) => (
  <ButtonGroup className="mb-5">
    <Button
      variant="primary"
      className="rounded me-2 btn-md-lg shadow rounded-lg bg-blue-500 hover:bg-blue-600 transition px-4 py-2"
      onClick={onViewAll}
    >
      View All Characters
    </Button>
    {onCreate && (
      <Button
        variant="success"
        className="btn-sm rounded btn-md-lg shadow rounded-lg transition px-4 py-2"
        onClick={onCreate}
      >
        Create New Character
      </Button>
    )}
  </ButtonGroup>
);

export default CharacterActions;
