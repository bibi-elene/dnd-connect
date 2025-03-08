'use client';

import { Character } from '@/app/utils/types';
import Loading from './Loading';
import EditButton from './EditButton';
import { useNavigate } from '@/app/utils/navigation';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  error: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, loading, error }) => {
  const { goToCharacter } = useNavigate();

  if (loading) {
    return <Loading message="Loading characters..." size="sm" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </tr>
        </thead>
        <TableBody>
          {characters.map((char) => (
            <TableRow key={char.id}>
              <TableCell className="font-medium">{char.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{char.class}</Badge>
              </TableCell>
              <TableCell>{char.level}</TableCell>
              <TableCell className="text-right">
                <EditButton onEdit={() => goToCharacter(char.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default CharacterList;
