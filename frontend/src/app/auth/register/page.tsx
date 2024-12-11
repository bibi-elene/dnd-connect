'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import { routes } from '@/app/utils/routes';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';

interface RegisterFormInputs {
  username: string;
  password: string;
}

const Register = () => {
  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { register } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await register(data.username, data.password);
      setSuccessMessage('Registration successful! You can now log in.');
      setErrorMessage('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message || 'Registration failed. Username might be taken.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ReturnButtons withDashboardButton={false} buttonText="Home" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-black mb-4 text-center">Register</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...registerUser('username', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...registerUser('password', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
        <p className="mt-4 text-center text-black">
          Already have an account?
          <Link href={routes.login} className="text-blue-500 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
