'use client';

import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '@/app/components/widgets/Loading';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';
import { apiRoutes } from '@/app/api/apiRoutes';
import { roleOptions } from '@/app/utils/constants';
import { useNavigate } from '@/app/utils/navigation';

interface UserFormInputs {
  username: string;
  role: 'USER' | 'ADMIN';
}

const EditUser = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    watch,
  } = useForm<UserFormInputs>();

  const [loading, setLoading] = useState(true);
  const [loadingEditSave, setLoadingEditSave] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { goToUsers } = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiRoutes.users.user(Number(id)), {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setValue('username', data.username);
        setValue('role', data.role);
      } catch (error) {
        setErrorMessage('Failed to load user details.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data: UserFormInputs) => {
    setLoadingEditSave(true);
    try {
      const response = await fetch(apiRoutes.users.user(Number(id)), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setSuccessMessage('User updated successfully!');
      goToUsers();
    } catch (error) {
      setErrorMessage('Failed to update user.');
      console.error('Error:', error);
    } finally {
      setLoadingEditSave(false);
    }
  };

  const role = watch('role');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Loading user details..." size="lg" />
      </div>
    );
  }

  const isButtonDisabled = !isDirty;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ReturnButtons fallbackUrl="/users" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-center">Edit User</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...register('username', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">Username is required</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            {...register('role', { required: true })}
            value={role}
            className={`w-full px-3 py-2 border ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Role</option>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">Role is required</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full py-2 rounded text-white ${
            isButtonDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Save Changes
        </button>
      </form>
      {loadingEditSave && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Loading message="" size="md" />
        </div>
      )}
    </div>
  );
};

export default EditUser;
