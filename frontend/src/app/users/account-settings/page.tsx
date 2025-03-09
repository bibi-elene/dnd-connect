'use client';

import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/app/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReturnButton from '@/app/components/widgets/ReturnButton';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface AccountSettingsFormInputs {
  username: string;
  email: string;
}

const AccountSettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<AccountSettingsFormInputs>();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, loading, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch user profile');
        const data = await res.json();
        setValue('username', data.username);
        setValue('email', data.email || '');
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching user data.');
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, setValue]);

  const onSubmit = async (data: AccountSettingsFormInputs) => {
    try {
      const res = await fetch('/api/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
        }),
      });
      console.log(res, 'my res')

      if (!res.ok) throw new Error('Failed to update account settings');

      const updatedUser = await res.json();
      setUser(updatedUser); // Update AuthContext user state
      setSuccessMessage('Account details updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update account settings. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <ReturnButton />
      <Card className="w-full max-w-md p-6 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Account Settings</CardTitle>
        </CardHeader>

        <CardContent>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter your username"
                className="text-black"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
                className="text-black"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                value={user?.role || 'User'}
                disabled
                className="text-black"
              />
            </div>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={!isDirty}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AccountSettingsPage() {
  return (
    <ProtectedRoute>
      <AccountSettings />
    </ProtectedRoute>
  );
}
