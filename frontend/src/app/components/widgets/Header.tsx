import { AuthContext } from '@/app/context/AuthContext';
import { ROLES } from '@/app/utils/constants';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';

const Header: React.FC = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const title = user?.role === ROLES.ADMIN ? 'Admin Panel' : 'Dashboard';

  return (
    <>
      <h1 className="text-2xl fw-semibold mb-0">{title}</h1>
      <div>
        <span className="me-3 fw-medium fs-5 text-muted">Hello, {user?.username}</span>{' '}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Button variant="destructive" onClick={logout}>
            Log out
          </Button>
        )}
      </div>
    </>
  );
};

export default Header;
