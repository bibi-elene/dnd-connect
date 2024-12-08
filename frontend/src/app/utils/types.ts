export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  image?: string;
}

export interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}
