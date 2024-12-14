import { Character } from '@/app/utils/types';
import EditButton from './EditButton';
import Loading from './Loading';
import { ListGroup, Badge, Button } from 'react-bootstrap';

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
            <Badge bg="info" className="me-2">
              {character.class}
            </Badge>
            <span>Level {character.level}</span>
          </div>
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(character.id)}>
            Edit
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CharacterList;
