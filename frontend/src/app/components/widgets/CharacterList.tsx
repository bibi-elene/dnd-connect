'use client';

import { useState } from 'react';
import Loading from './Loading';
import EditButton from './EditButton';
import { useNavigate } from '@/app/utils/navigation';
import { TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { CharactersContext } from '@/app/context/CharactersContext';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { apiRoutes } from '@/app/api/apiRoutes';

const CharacterList: React.FC = () => {
  const { goToCharacter } = useNavigate();
  const { characters, loading, error, refetchCharacters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedCharacter) return;

    try {
      await axios.delete(apiRoutes.characters.character(selectedCharacter));

      await refetchCharacters();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

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
          {characters.slice(-3).map((char) => (
            <TableRow key={char.id}>
              <TableCell className="font-medium">{char.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{char.class}</Badge>
              </TableCell>
              <TableCell>{char.level}</TableCell>
              <TableCell className="text-right">
                <EditButton onEdit={() => goToCharacter(char.id)} />
                <button
                  onClick={() => {
                    setSelectedCharacter(char.id);
                    setDialogOpen(true);
                  }}
                >
                  <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer w-5 h-5 ml-2" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Delete Character</h2>
            <p className="text-gray-500">
              Are you sure you want to delete this character? <br /> This action cannot be undone.
            </p>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterList;
