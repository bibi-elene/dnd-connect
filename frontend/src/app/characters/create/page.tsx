'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '@/app/components/widgets/Loading';
import Image from 'next/image';
import { CharacterFormInputs } from '@/app/utils/types';
import {
  characterImages,
  classOptions,
  raceOptions,
  backgroundOptions,
  skillsOptions,
} from '@/app/utils/constants';
import { useNavigate } from '@/app/utils/navigation';
import { apiRoutes } from '@/app/api/apiRoutes';

const CreateCharacter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CharacterFormInputs>();
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { goToDashboard } = useNavigate();

  const selectedClass = watch('class');
  const selectedRace = watch('race');

  const defaultImagePath =
    characterImages[selectedClass]?.[selectedRace] || '/assets/default_character.jpeg';

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileError(null);

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    setUploadedImage(file);

    if (file && file.size > maxFileSize) {
      setFileError('File size should not exceed 2MB.');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (uploadedImage) {
        formData.append('image', uploadedImage);
      } else {
        const imageResponse = await fetch(defaultImagePath);
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, 'default_character_image.jpeg');
      }

      const response = await fetch(apiRoutes.characters.all, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create character');
      }

      setSuccessMessage('Successfully created a new character');
      goToDashboard();
    } catch (error) {
      setErrorMessage('Failed to create character.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading message="" size="lg" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-black mb-4 text-center">Create New Character</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class</label>
          <select
            {...register('class', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.class ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Class</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.class && <p className="text-red-500 text-sm">Class is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Race</label>
          <select
            {...register('race', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.race ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Race</option>
            {raceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.race && <p className="text-red-500 text-sm">Race is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Background</label>
          <select
            {...register('background', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.background ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Background</option>
            {backgroundOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.background && <p className="text-red-500 text-sm">Background is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <select
            {...register('skills', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.skills ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          >
            <option value="">Select Skills</option>
            {skillsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.skills && <p className="text-red-500 text-sm">Skills are required</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Level</label>
          <input
            type="number"
            {...register('level', { required: true, min: 1 })}
            className={`w-full px-3 py-2 border ${
              errors.level ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.level && (
            <p className="text-red-500 text-sm">Level is required and must be at least 1</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Avatar</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
          />
          {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
        </div>
        <button
          type="submit"
          disabled={!!fileError || loading}
          className={`w-full py-2 rounded text-white ${
            !!fileError || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Create Character
        </button>
      </form>

      <div className="bg-gradient-to-br text-black from-green-100 to-green-300 p-6 rounded shadow-md ml-6 w-1/2 max-w-sm flex flex-col items-center">
        <h3 className="text-xl mb-4 text-center">Character Preview</h3>
        <Image
          src={previewImage || defaultImagePath}
          width={320}
          height={480}
          style={{ maxHeight: '550px' }}
          alt="Character Preview"
        />
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Loading message="" size="lg" />
        </div>
      )}
    </div>
  );
};

export default function CreateCharacterPage() {
  return (
    <ProtectedRoute>
      <CreateCharacter />
    </ProtectedRoute>
  );
}
