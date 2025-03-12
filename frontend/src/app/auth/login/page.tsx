'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import Loading from '@/app/components/widgets/Loading';
import { routes } from '@/app/utils/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      await login(data.username, data.password);
    } catch (error: any) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: 'url(/assets/signup.png)' }}
    >
      <div className="bg-white p-6 max-w-sm w-full rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register('username', { required: true })} />
            {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password', { required: true })} />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>
          <Button type="submit" className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <Link href={routes.register} className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Loading message="" size="sm" />
        </div>
      )}
    </div>
  );
};

export default Login;
