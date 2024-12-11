'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../utils/constants';
import Loading from '../components/widgets/Loading';
import EditButton from '../components/widgets/EditButton';
import ReturnButtons from '../components/widgets/ReturnButtons';
import { useNavigate } from '../utils/navigation';
import { apiRoutes } from '../api/apiRoutes';
import { User } from '../utils/types';

const UsersList = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { goToUser } = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role !== ROLES.ADMIN) {
        setErrorMessage('Access denied.');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(apiRoutes.users.all, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorMessage('Failed to fetch users.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Loading users..." size="lg" />
      </div>
    );
  }

  if (user.role !== ROLES.ADMIN) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Access denied.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-5 flex items-center justify-center">
      <ReturnButtons fallbackUrl="/dashboard" />
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center text-black">All Users</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {users.length === 0 ? (
          <p className="text-black">No users found.</p>
        ) : (
          <ul className="text-black space-y-4 px-0">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p>Role: {user.role}</p>
                </div>

                <EditButton onClick={() => goToUser(user.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <UsersList />
    </ProtectedRoute>
  );
}
