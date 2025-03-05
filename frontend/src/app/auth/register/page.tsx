'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import { routes } from '@/app/utils/routes';

// shadcn UI components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RegisterFormInputs {
  username: string;
  password: string;
}

const Register = () => {
  const {
    register: registerUser,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>();
  const { register } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await register(data.username, data.password);
      setShowSuccess(true);
      setErrorMessage('');
      reset(); // Clear form values after success
    } catch (error: any) {
      setErrorMessage(
        error.message || 'Registration failed. Username might be taken.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Dialog open>
        <DialogContent
          className="max-w-sm p-6 space-y-4"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click
          onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on ESC key
        >
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Create a new account by providing your credentials.
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {showSuccess ? (
            <Alert>
              <CheckIcon className="h-4 w-4" />
              <AlertTitle>Registration Successful!</AlertTitle>
              <AlertDescription>
                Your account has been created. Click below to proceed to login.
              </AlertDescription>
              <div className="mt-4">
                <Link href={routes.login}>
                  <Button className="w-full">Proceed to Login</Button>
                </Link>
              </div>
            </Alert>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    {...registerUser('username', { required: true })}
                    className="text-black"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">Username is required</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...registerUser('password', { required: true })}
                    className="text-black"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">Password is required</p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                </DialogFooter>
              </form>
              <p className="mt-4 text-center">
                Already have an account?
                <Link href={routes.login} className="text-blue-500 ml-2">
                  Login
                </Link>
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;