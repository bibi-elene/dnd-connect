'use client';

import { useContext } from 'react';
import { Settings, User2 } from 'lucide-react';
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

import { routes } from '@/app/utils/routes';
import { ROLES } from '@/app/utils/constants';
import { admin_section, application, dnd_info, user_section } from '@/app/data/sidebar-content';

export function AppSidebar() {
  const { user, logout } = useContext(AuthContext);

  const accountSection = [
    ...(user?.role === ROLES.ADMIN ? admin_section : user_section),
    { title: 'Account Settings', url: routes.accountSettings, icon: Settings },
  ];
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
              {dnd_info.map((item) => (
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
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountSection.map((item) => (
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
          <div className="w-full flex items-center gap-3 p-2">
            <User2 className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium leading-none">{user?.username || 'Guest'}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email || 'example@mail.com'}
              </span>
            </div>
          </div>
          {user ? (
            <SidebarMenuButton asChild onClick={logout}>
              <a className="w-full justify-center danger-custom-button" href={routes.home}>
                Logout
              </a>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild>
              <a href={routes.login} className="w-full justify-center secondary-custom-button">
                Login
              </a>
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
