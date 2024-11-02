"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "../utils/axios";
import ProtectedRoute from "../components/ProtectedRoute";

interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
}

const CharactersList = () => {
  const { user } = useContext(AuthContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("/characters");
        setCharacters(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch characters.");
        console.error(error);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center text-black">
          Your Characters
        </h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {characters.length === 0 ? (
          <p className="text-black">No characters found.</p>
        ) : (
          <ul className="text-black">
            {characters.map((character) => (
              <li key={character.id} className="border-b py-2">
                <strong>{character.name}</strong> - {character.class} (Level:{" "}
                {character.level})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function CharactersPage() {
  return (
    <ProtectedRoute>
      <CharactersList />
    </ProtectedRoute>
  );
}
