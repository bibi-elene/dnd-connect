'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AvatarUpload from './UploadAvatar';

interface NameAndAvatarStepProps {
  previousStep: () => void;
}

const NameAndAvatarStep: React.FC<NameAndAvatarStepProps> = ({ previousStep }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (file: File | null, previewData: string | null) => {
    setValue('image', file);
    setPreview(previewData);
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Final Step: Name & Avatar</h2>
      <p className="mb-6 text-center text-gray-600">
        Enter your character's name and upload an avatar.
      </p>

      <div className="flex flex-col items-center">
        {/* Name Input */}
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { required: 'Name is required' })}
          />
          {/* Only show error message when user submits */}
          {isSubmitted && errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
          )}
        </div>

        {/* Avatar Upload */}
        <div className="mb-4 w-full max-w-md">
          <AvatarUpload onUpload={handleUpload} />
        </div>

        {/* Avatar Preview */}
        {preview && (
          <div className="mb-4">
            <Image
              src={preview}
              alt="Avatar preview"
              width={150}
              height={150}
              className="rounded-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button type="button" onClick={previousStep}>
          Back
        </Button>
        {/* On Submit, show success pop-up */}
        <Button type="submit">Create Character</Button>
      </div>
    </motion.div>
  );
};

export default NameAndAvatarStep;
