"use client";

import {
  BedIcon,
  BookMinusIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  LucideIcon,
  UserRound,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { roles } from "~/components/features/user/config";
import { Button } from "~/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "~/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "~/components/ui/sidebar";

type MenuItemShape = {
  text: string;
  path: string;
  icon: LucideIcon;
};

const RefereeSidebarMenuItem = ({ icon: Icon, path, text }: MenuItemShape) => {
  return (
    <Collapsible asChild defaultOpen={false} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={text} asChild>
            <Link href={path}>
              <Icon className="size-4" />
              <span>{text}</span>
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const RefereeSidebarMenu = () => {
  const items: MenuItemShape[] = [
    {
      text: "داشبورد",
      path: "/",
      icon: HomeIcon,
    },
    {
      text: "اطلاعات شخصی",
      path: "/",
      icon: UserRound,
    },
    {
      text: "رویدادها",
      path: "/",
      icon: CalendarIcon,
    },
    {
      text: "آموزش",
      path: "/",
      icon: BookMinusIcon,
    },
    {
      text: "خدمات",
      path: "/",
      icon: BedIcon,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, i) => (
          <RefereeSidebarMenuItem key={i} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const RefereeSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      className="absolute left-0 top-2 rounded-full -translate-x-2/3 size-5 !bg-referee"
      size={"icon"}
      onClick={toggleSidebar}
    >
      {open ? (
        <ChevronRightIcon className="size-4" />
      ) : (
        <ChevronLeftIcon className="size-4" />
      )}
    </Button>
  );
};

const RefereeSidebarHeader = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();
  const user = session?.user;

  const activeRoles = roles.filter((role) => user?.roles.includes(role.value));

  if (!open) return null;

  return (
    <SidebarHeader className="bg-referee text-referee-foreground flex-row">
      <p className="text-xs">{'"نام کاربری"'}</p>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="bg-black/20 text-xs flex items-center gap-x-1 px-1">
          <span>داور</span>
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {activeRoles.map((role) => (
            <DropdownMenuItem key={role.value} asChild>
              <Link href={role.path}>{role.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
  );
};

export const RefereeSidebar = () => {
  return (
    <Sidebar
      side="right"
      variant="sidebar"
      className="z-50 h-[calc(100%-70.5px)] bottom-0 top-auto"
      collapsible="icon"
    >
      <RefereeSidebarHeader />
      <SidebarContent className="bg-referee text-referee-foreground">
        <RefereeSidebarMenu />
      </SidebarContent>
      <SidebarFooter className="bg-referee" />

      <RefereeSidebarTrigger />
    </Sidebar>
  );
};
