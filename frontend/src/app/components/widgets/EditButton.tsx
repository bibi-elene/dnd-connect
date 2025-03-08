import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

interface EditButtonProps {
  onEdit: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit, label = 'Edit' }) => {
  return (
    <Button variant="ghost" size="icon" onClick={onEdit} title={label}>
      <PencilIcon className="h-4 w-4" />
    </Button>
  );
};

export default EditButton;