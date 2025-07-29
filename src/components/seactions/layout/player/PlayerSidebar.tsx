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
import { usePathname } from "next/navigation";
import { LogoutBtn } from "~/components/features/auth/LogoutBtn";
import { roles } from "~/components/features/user/config";
import { getFullName } from "~/components/features/user/utils";
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
import { cn } from "~/lib/utils";

type MenuItemShape = {
  text: string;
  path: string;
  icon: LucideIcon;
};

const PlayerSidebarMenuItem = ({ icon: Icon, path, text }: MenuItemShape) => {
  const pathname = usePathname();
  const isActive = path === pathname;
  return (
    <Collapsible asChild defaultOpen={false} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={text} asChild>
            <Link
              href={path}
              className={cn("!bg-transparent !text-white", {
                "!bg-black/10": isActive,
              })}
            >
              <Icon className="size-4" />
              <span>{text}</span>
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const PlayerSidebarMenu = () => {
  const items: MenuItemShape[] = [
    {
      text: "داشبورد",
      path: "/dashboard/player",
      icon: HomeIcon,
    },
    {
      text: "اطلاعات شخصی",
      path: "/dashboard/player/me",
      icon: UserRound,
    },
    {
      text: "رویدادها",
      path: "/dashboard/player/events",
      icon: CalendarIcon,
    },
    {
      text: "آموزش",
      path: "/dashboard/player/educations",
      icon: BookMinusIcon,
    },
    {
      text: "خدمات",
      path: "/dashboard/player/services",
      icon: BedIcon,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, i) => (
          <PlayerSidebarMenuItem key={i} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const PlayerSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      className="absolute left-0 top-2 rounded-full -translate-x-2/3 size-5 !bg-player"
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

const PlayerSidebarHeader = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();
  const user = session?.user;

  const activeRoles = roles.filter((role) => user?.roles.includes(role.value));

  if (!open) return null;

  return (
    <SidebarHeader className="bg-player text-player-foreground flex-row">
      <p className="text-xs">{getFullName(user)}</p>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="bg-black/20 text-xs flex items-center gap-x-1 px-1">
          <span>ورزشکار</span>
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

export const PlayerSidebar = () => {
  return (
    <Sidebar
      side="right"
      variant="sidebar"
      className="z-50 h-[calc(100%-70.5px)] bottom-0 top-auto"
      collapsible="icon"
    >
      <PlayerSidebarHeader />
      <SidebarContent className="bg-player text-player-foreground">
        <PlayerSidebarMenu />
      </SidebarContent>

      <SidebarFooter className="bg-player">
        <LogoutBtn />
      </SidebarFooter>

      <PlayerSidebarTrigger />
    </Sidebar>
  );
};
