import { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { CharactersContext } from '@/app/context/CharactersContext';
import { useNavigate } from '@/app/utils/navigation';
import { useRouter } from 'next/navigation';

const CharacterActions: React.FC = () => {
  const { loading } = useContext(CharactersContext);
  const { goToCharacters, goToCharacterCreation } = useNavigate();

  const router = useRouter();

  // Prefetch character creation page when component mounts
  useEffect(() => {
    router.prefetch('/characters/create');
  }, [router]);

  const handleNavigation = () => {
    router.push('/characters/create'); // 🚀 Navigate immediately
    setTimeout(() => {
      goToCharacterCreation(); // 🛠️ Ensure any additional logic runs *after* navigation
    }, 0);
  };

  return (
    <div className="flex gap-2 mb-5">
      <Button variant="outline" onClick={goToCharacters} disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'View All Characters'}
      </Button>

      <Button variant="default" onClick={handleNavigation} disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create New Character'}
      </Button>
    </div>
  );
};

export default CharacterActions;
