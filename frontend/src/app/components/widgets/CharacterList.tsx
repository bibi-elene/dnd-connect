import { Character } from '@/app/utils/types';
import Loading from './Loading';
import { ListGroup } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string;
  onEdit: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, loading, error, onEdit }) => {
  if (loading) {
    return <Loading message="Loading characters..." size="sm" />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <ListGroup>
      {characters.map((character) => (
        <ListGroup.Item
          key={character.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong className="text-dark">{character.name}</strong>{' '}
            <span className="me-2 custom-badge">{character.class}</span>
            <span>Level {character.level}</span>
          </div>
          <button className="edit-button" onClick={() => onEdit(character.id)}>
            <FaPencilAlt />
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CharacterList;
