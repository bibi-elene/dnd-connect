import { AuthContext } from '@/app/context/AuthContext';
import { useNavigate } from '@/app/utils/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';

const UserActions: React.FC = () => {
  const { loading } = useContext(AuthContext);
  const { goToUsers } = useNavigate();

  return (
    <div className="flex gap-2 mb-5">
      <Button variant="outline" onClick={goToUsers} disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'View All Users'}
      </Button>
    </div>
  );
};

export default UserActions;
