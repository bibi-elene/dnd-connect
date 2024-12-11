import { useRouter } from 'next/navigation';
import { routes } from './routes';

export const useNavigate = () => {
  const router = useRouter();

  return {
    goToHome: () => router.push(routes.home),
    goToDashboard: () => router.push(routes.dashboard),
    goToLogin: () => router.push(routes.login),
    goToRegister: () => router.push(routes.register),
    goToCharacter: (id: number) => router.push(routes.character(id)),
    goToCharacters: () => router.push(routes.characters),
    goToCharacterCreation: () => router.push(routes.characterCreate),
    goToUser: (id: number) => router.push(routes.user(id)),
    goToUsers: () => router.push(routes.users),
  };
};
