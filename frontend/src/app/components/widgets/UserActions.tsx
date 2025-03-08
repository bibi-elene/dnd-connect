import { Button } from '@/components/ui/button';

interface UserActionProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const UserActions: React.FC<UserActionProps> = ({ onViewAll, onCreate }) => (
  <div className="flex gap-2 mb-5">
    <Button variant="outline" onClick={onViewAll}>
      View All Users
    </Button>
    {onCreate && (
      <Button variant="default" onClick={onViewAll}>
        Create New User
      </Button>
    )}
  </div>
);

export default UserActions;
