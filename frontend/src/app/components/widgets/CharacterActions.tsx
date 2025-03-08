import { Button } from '@/components/ui/button';

interface CharacterActionsProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onViewAll, onCreate }) => (
  <div className="flex gap-2 mb-5">
    <Button variant="outline" onClick={onViewAll}>
      View All Characters
    </Button>
    {onCreate && (
      <Button variant="default" onClick={onCreate}>
        Create New Character
      </Button>
    )}
  </div>
);

export default CharacterActions;
