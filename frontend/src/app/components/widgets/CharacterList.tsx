import { Character } from '@/app/utils/types';
import EditButton from './EditButton';
import Loading from './Loading';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string;
  onEdit: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  onEdit,
}) => {
  if (loading) {
    return <Loading message="Loading characters..." size="sm" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <ul className="space-y-2 px-0">
      {characters.map((character) => (
        <li
          key={character.id}
          className="bg-gray-100 p-3 text-gray-600 rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-between"
        >
          <div>
            <strong className="text-gray-700">{character.name}</strong> -{' '}
            {character.class} (Level {character.level})
          </div>
          <EditButton onClick={() => onEdit(character.id)} />
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
