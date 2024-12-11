'use client';

import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '@/app/components/widgets/Loading';
import { CharacterFormInputs } from '@/app/utils/types';
import Image from 'next/image';
import {
  backgroundOptions,
  classOptions,
  raceOptions,
  skillsOptions,
} from '@/app/utils/constants';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';
import { useNavigate } from '@/app/utils/navigation';
import { apiRoutes } from '@/app/api/apiRoutes';

const EditCharacter = () => {
  const { id } = useParams();
  const { goToCharacters } = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CharacterFormInputs>();
  const [loading, setLoading] = useState(true);
  const [loadingEditSave, setLoadingEditSave] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          apiRoutes.characters.character(Number(id)),
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }

        const data = await response.json();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'image' && value) {
            // Remove Base64 prefix
            const base64String = (value as string).split(',')[1];

            // Decode Base64 string to create a Blob or File
            const byteCharacters = atob(base64String);
            const byteNumbers = Array.from(byteCharacters).map((char) =>
              char.charCodeAt(0)
            );
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            const file = new File([blob], 'character-image.jpg', {
              type: 'image/jpeg',
            });
            // if img is not updated, existing image will be used
            setUploadedImage(file);
            // set the preview image as a URL for rendering
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);
          } else {
            setValue(key as keyof CharacterFormInputs, value as string);
          }
        });
      } catch (error) {
        setErrorMessage('Failed to load character details.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id, setValue]);

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
    }
  };

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoadingEditSave(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id') formData.append(key, value);
    });

    if (uploadedImage) {
      formData.append('image', uploadedImage);
    }

    try {
      const response = await fetch(apiRoutes.characters.character(Number(id)), {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      setSuccessMessage('Character updated successfully!');
      goToCharacters();
    } catch (error) {
      setErrorMessage('Failed to update character.');
      console.error('Error:', error);
    } finally {
      setLoadingEditSave(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Loading character details..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ReturnButtons fallbackUrl="/characters" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-center">Edit Character</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
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
          {errors.class && (
            <p className="text-red-500 text-sm">Class is required</p>
          )}
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
          {errors.race && (
            <p className="text-red-500 text-sm">Race is required</p>
          )}
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
          {errors.background && (
            <p className="text-red-500 text-sm">Background is required</p>
          )}
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
          {errors.skills && (
            <p className="text-red-500 text-sm">Skills are required</p>
          )}
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
            <p className="text-red-500 text-sm">
              Level is required and must be at least 1
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Avatar
          </label>
          <div className="relative group">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>
          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!!fileError}
          className={`w-full py-2 rounded text-white ${
            fileError
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Save Changes
        </button>
      </form>
      {previewImage && (
        <div className="bg-gradient-to-br text-black from-green-100 to-green-300 p-6 rounded shadow-md ml-6 w-1/2 max-w-sm flex flex-col items-center">
          <h3 className="text-xl mb-4 text-center">Character Preview</h3>
          <Image
            src={previewImage || ''}
            width={320}
            height={480}
            style={{ maxHeight: '550px' }}
            alt="Character Preview"
          />
        </div>
      )}
      {loadingEditSave && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Loading message="" size="md" />
        </div>
      )}
    </div>
  );
};

export default EditCharacter;
