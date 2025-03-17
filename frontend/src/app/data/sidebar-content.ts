import {
  Home,
  LayoutDashboard,
  MessageCircle,
  Search,
  Swords,
  Castle,
  PersonStanding,
  Users,
  Smile,
} from 'lucide-react';
import { routes } from '@/app/utils/routes';

export const application = [
  { title: 'Home', url: routes.home, icon: Home },
  { title: 'Dashboard', url: routes.dashboard, icon: LayoutDashboard },
  { title: 'Chat', url: routes.chat, icon: MessageCircle },
  { title: 'Search', url: '#', icon: Search },
];

export const dnd_info = [
  { title: 'Character Classes', url: routes.characterClasses, icon: Swords },
  { title: 'Character Races', url: routes.characterRaces, icon: Castle },
  { title: 'Project Roadmap', url: routes.roadmap, icon: Smile },
];

export const user_section = [{ title: 'Characters', url: routes.characters, icon: PersonStanding }];

export const admin_section = [...user_section, { title: 'Users', url: routes.users, icon: Users }];
