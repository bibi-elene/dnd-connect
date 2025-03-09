'use client';

import { useContext } from 'react';
import { Home, Search, Settings, User2, Users, Swords, Castle, MessageCircle } from 'lucide-react';
import { AuthContext } from '@/app/context/AuthContext';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { routes } from '@/app/utils/routes';
import Link from 'next/link';

const application = [
  {
    title: 'Home',
    url: routes.home,
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: routes.dashboard,
    icon: Users,
  },
  {
    title: 'Chat',
    url: routes.chat,
    icon: MessageCircle,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: routes.accountSettings,
    icon: Settings,
  },
];

const info = [
  {
    title: 'Character Classes',
    url: routes.characterClasses,
    icon: Swords,
  },
  {
    title: 'Character Races',
    url: routes.characterRaces,
    icon: Castle,
  },
];

export function AppSidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {application.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {info.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 gap-3">
                <User2 className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium leading-none">
                    {user?.username || 'Guest'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || 'example@mail.com'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
          {user ? (
            <Button variant="destructive" size="default" className="w-full mt-2" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link href={routes.login} className="w-full mt-2">
              <Button variant="default" size="default" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
