import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, Loader2 } from 'lucide-react';
import { MIN_LOADING_TIME } from '@/app/utils/constants';

interface EditButtonProps {
  onEdit: () => Promise<void> | void; // Supports async functions
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit, label = 'Edit' }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      await onEdit();
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADING_TIME - elapsedTime;

      setTimeout(() => setLoading(false), remainingTime > 0 ? remainingTime : 0);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick} title={label} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PencilIcon className="h-4 w-4" />}
    </Button>
  );
};

export default EditButton;
