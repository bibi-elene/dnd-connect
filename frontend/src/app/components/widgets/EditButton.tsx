import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, Loader2 } from 'lucide-react';
import { CharactersContext } from '@/app/context/CharactersContext';

interface EditButtonProps {
  onEdit: () => Promise<void> | void; // Supports async functions
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit, label = 'Edit' }) => {
  const { loading } = useContext(CharactersContext);

  return (
    <Button variant="ghost" size="icon" onClick={onEdit} title={label} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PencilIcon className="h-4 w-4" />}
    </Button>
  );
};

export default EditButton;
