import {  
  Library,
  Bell,
  CreditCard,
  Home,
  Settings,
} from "lucide-react";
import React from "react";

export const MENU_ITEMS = (
  workspaceId: string,
): {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] => [
  { 
    title: "Home", 
    href: `/dashboard/${workspaceId}/home`, 
    icon: <Home size={20}/> 
  },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}`,
    icon: <Library size={20}/>,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <Bell size={20}/>,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard size={20}/>,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings size={20}/>,
  },
];
