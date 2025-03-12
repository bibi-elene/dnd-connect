'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import { routes } from '@/app/utils/routes';
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
      setErrorMessage(error.message || 'Registration failed. Username might be taken.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: 'url(/assets/signup.png)' }}
    >
      <div className="bg-white p-6 max-w-sm w-full rounded shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </div>
          </Alert>
        )}

        {showSuccess ? (
          <Alert className="mb-4">
            <CheckIcon className="h-4 w-4" />
            <div>
              <AlertTitle>Registration Successful!</AlertTitle>
              <AlertDescription>
                Your account has been created. Click below to proceed to login.
              </AlertDescription>
            </div>
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
                />
                {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerUser('password', { required: true })}
                />
                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </form>
            <p className="text-center">
              Already have an account?
              <Link href={routes.login} className="text-blue-500 ml-2">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
