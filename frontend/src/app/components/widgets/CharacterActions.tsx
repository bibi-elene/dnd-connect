import { ButtonGroup } from 'react-bootstrap';

interface CharacterActionsProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onViewAll, onCreate }) => (
  <ButtonGroup className="mb-5">
    <button className="primary-custom-button" onClick={onViewAll}>
      View All Characters
    </button>
    {onCreate && (
      <button className="secondary-custom-button ms-2" onClick={onCreate}>
        Create New Character
      </button>
    )}
  </ButtonGroup>
);

export default CharacterActions;
