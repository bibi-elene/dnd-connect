export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  image?: string;
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
