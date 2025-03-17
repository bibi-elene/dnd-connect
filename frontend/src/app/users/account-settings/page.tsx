'use client';

import { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { AuthContext } from '@/app/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReturnButton from '@/app/components/widgets/ReturnButton';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { apiRoutes } from '@/app/api/apiRoutes';

const accountSettingsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().optional(),
});

type AccountSettingsFormInputs = z.infer<typeof accountSettingsSchema>;

const AccountSettings: React.FC = () => {
  const { user, loading, setUser } = useContext(AuthContext);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<AccountSettingsFormInputs>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const { handleSubmit, formState, reset } = form;
  const { isDirty } = formState;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(apiRoutes.users.me, { credentials: 'include' });
        if (!res.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await res.json();

        reset({
          username: data.username || '',
          email: data.email || '',
        });
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching user data.');
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, reset]);

  const onSubmit = async (data: AccountSettingsFormInputs) => {
    try {
      const res = await fetch(apiRoutes.users.me, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          bio: data.bio,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update account settings');
      }

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
    <div className="flex h-screen items-center justify-center bg-white">
      <ReturnButton />
      <Card className="w-full max-w-md p-6 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Account Settings</CardTitle>
        </CardHeader>

        <CardContent>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1.5">
                <FormLabel>Role</FormLabel>
                <Input type="text" value={user?.role || 'User'} disabled />
              </div>

              <CardFooter className="flex justify-end py-2 px-0">
                <Button variant="dark" type="submit" disabled={!isDirty}>
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
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
