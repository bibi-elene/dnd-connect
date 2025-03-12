import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { MIN_LOADING_TIME } from '@/app/utils/constants';

interface CharacterActionsProps {
  onViewAll: () => Promise<void> | void;
  onCreate?: () => Promise<void> | void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onViewAll, onCreate }) => {
  const [loading, setLoading] = useState<{ viewAll: boolean; create: boolean }>({
    viewAll: false,
    create: false,
  });

  const handleClick = async (
    action: 'viewAll' | 'create',
    callback?: () => Promise<void> | void
  ) => {
    if (!callback) return;
    setLoading((prev) => ({ ...prev, [action]: true }));

    const startTime = Date.now();

    try {
      await callback();
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADING_TIME - elapsedTime;

      setTimeout(
        () => setLoading((prev) => ({ ...prev, [action]: false })),
        remainingTime > 0 ? remainingTime : 0
      );
    }
  };

  return (
    <div className="flex gap-2 mb-5">
      <Button
        variant="outline"
        onClick={() => handleClick('viewAll', onViewAll)}
        disabled={loading.viewAll}
      >
        {loading.viewAll ? <Loader2 className="w-4 h-4 animate-spin" /> : 'View All Characters'}
      </Button>

      {onCreate && (
        <Button
          variant="default"
          onClick={() => handleClick('create', onCreate)}
          disabled={loading.create}
        >
          {loading.create ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create New Character'}
        </Button>
      )}
    </div>
  );
};

export default CharacterActions;
