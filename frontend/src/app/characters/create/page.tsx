"use client";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import axios from "../../utils/axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";

interface CharacterFormInputs {
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
}

const CreateCharacter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CharacterFormInputs>();
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: CharacterFormInputs) => {
    try {
      await axios.post("/characters", data);
      setSuccessMessage("Character created successfully!");
      router.push("/dashboard"); // Redirect to dashboard or character list
    } catch (error) {
      setErrorMessage("Failed to create character.");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-center">Create New Character</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class</label>
          <input
            type="text"
            {...register("class", { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.class ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.class && (
            <p className="text-red-500 text-sm">Class is required</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Level</label>
          <input
            type="number"
            {...register("level", { required: true, min: 1 })}
            className={`w-full px-3 py-2 border ${
              errors.level ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.level && (
            <p className="text-red-500 text-sm">
              Level is required and must be at least 1
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Race</label>
          <input
            type="text"
            {...register("race", { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.race ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.race && (
            <p className="text-red-500 text-sm">Race is required</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Background</label>
          <input
            type="text"
            {...register("background", { required: true })}
            className={`w-full px-3 py-2 border ${
              errors.background ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.background && (
            <p className="text-red-500 text-sm">Background is required</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Create Character
        </button>
      </form>
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
