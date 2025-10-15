"use client";

import {
  BedIcon,
  BookMinusIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  IdCardIcon,
  LucideIcon,
  UserRound,
  XIcon,
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

const CoachSidebarMenuItem = ({ icon: Icon, path, text }: MenuItemShape) => {
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

const CoachSidebarMenu = () => {
  const items: MenuItemShape[] = [
    {
      text: "داشبورد",
      path: "/dashboard/coach",
      icon: HomeIcon,
    },
    {
      text: "اطلاعات شخصی",
      path: "/dashboard/coach/me",
      icon: UserRound,
    },
    {
      text: "رویدادها",
      path: "/dashboard/coach/events",
      icon: CalendarIcon,
    },
    {
      text: "آموزش",
      path: "/dashboard/coach/educations",
      icon: BookMinusIcon,
    },
    {
      text: "خدمات",
      path: "/dashboard/coach/services",
      icon: BedIcon,
    },
    {
      text: "کارت عضویت",
      path: "/dashboard/coach/registraion-card",
      icon: IdCardIcon,
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
      className="absolute left-0 top-2 rounded-full -translate-x-2/3 size-5 !bg-coach hidden md:block"
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
  const { open, setOpenMobile } = useSidebar();
  const { data: session } = useSession();
  const user = session?.user;

  const activeRoles = roles.filter((role) => user?.roles.includes(role.value));

  if (!open) return null;

  return (
    <SidebarHeader className="bg-coach text-coach-foreground flex-row">
      <p className="text-xs">{getFullName(user)}</p>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="bg-black/20 text-xs flex items-center gap-x-1 px-1">
          <span>مربی</span>
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

      <button
        className="md:hidden mr-auto"
        onClick={() => setOpenMobile(false)}
      >
        <XIcon className="size-4" />
      </button>
    </SidebarHeader>
  );
};

const CoachSidebarFooter = () => {
  const { open } = useSidebar();

  if (!open) return null;

  return (
    <SidebarFooter className="bg-coach">
      <LogoutBtn />
    </SidebarFooter>
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

      <CoachSidebarFooter />

      <CoachSidebarTrigger />
    </Sidebar>
  );
};
