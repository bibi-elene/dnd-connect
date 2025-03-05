'use client';

import { useContext } from 'react';
import { Calendar, Home, Inbox, Search, Settings, User2 } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { routes } from '@/app/utils/routes';
import Link from 'next/link';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
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
              {items.map((item) => (
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
                    {user?.email || 'elene@mail.com'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-full">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={routes.accountSettings}>Account Settings</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem> */}
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href={routes.login}>Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
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
