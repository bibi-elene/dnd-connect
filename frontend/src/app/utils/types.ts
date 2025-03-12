// regex to remove comments: \/\*.*?\*\/
// regex to capture jsx comments: \{\s*\/\*.*?\*\/\s*\}
export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  skills: string;
  abilityScores: Record<string, number>;
  image?: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  email?: string;
  avatar?: string;
}

export interface CharacterFormInputs {
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  skills: string[];
  abilityScores: Record<string, number>;
  image?: File | null;
}

export interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}
