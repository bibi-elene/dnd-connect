'use client';

import { useContext, useState } from 'react';
import Loading from './Loading';
import EditButton from './EditButton';
import { useNavigate } from '@/app/utils/navigation';
import { TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { UsersContext } from '@/app/context/UsersContext';
import { apiRoutes } from '@/app/api/apiRoutes';
import axios from 'axios';

const UsersList: React.FC = () => {
  const { goToUser } = useNavigate();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { users, loading, error, refetchUsers } = useContext(UsersContext);

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(apiRoutes.users.user(selectedUser));

      await refetchUsers();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <Loading message="Loading users..." size="sm" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </tr>
        </thead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <EditButton onEdit={() => goToUser(user.id)} />

                <button
                  onClick={() => {
                    setSelectedUser(user.id);
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
        <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Delete User</h2>
            <p className="text-gray-500">
              Are you sure you want to delete this user? This action cannot be undone.
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

export default UsersList;
