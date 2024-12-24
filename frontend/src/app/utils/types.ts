// regex to remove comments: \/\*.*?\*\/
// regex to capture jsx comments: \{\s*\/\*.*?\*\/\s*\}
export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  image?: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface CharacterFormInputs {
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  skills: string;
  image?: File;
}

export interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}
