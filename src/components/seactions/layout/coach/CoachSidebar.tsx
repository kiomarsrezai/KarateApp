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
import Link from "next/link";
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

const CoachSidebarMenuItem = ({ icon: Icon, path, text }: MenuItemShape) => {
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

const CoachSidebarMenu = () => {
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
          <CoachSidebarMenuItem key={i} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const CoachSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      className="absolute left-0 top-2 rounded-full -translate-x-2/3 size-5 !bg-coach"
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

const CoachSidebarHeader = () => {
  const { open } = useSidebar();
  if (!open) return null;

  return (
    <SidebarHeader className="bg-coach text-coach-foreground flex-row">
      <p className="text-xs">{'"نام کاربری"'}</p>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="bg-black/20 text-xs flex items-center gap-x-1 px-1">
          <span>مربی</span>
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/player"}>ورزشکار</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/referee"}>داور</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/coach"}>مربی</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>
  );
};

export const CoachSidebar = () => {
  return (
    <Sidebar
      side="right"
      variant="sidebar"
      className="z-50 h-[calc(100%-70.5px)] bottom-0 top-auto"
      collapsible="icon"
    >
      <CoachSidebarHeader />
      <SidebarContent className="bg-coach text-coach-foreground">
        <CoachSidebarMenu />
      </SidebarContent>
      <SidebarFooter className="bg-coach" />

      <CoachSidebarTrigger />
    </Sidebar>
  );
};
