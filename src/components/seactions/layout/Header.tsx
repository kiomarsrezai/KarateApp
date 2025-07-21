"use client";

import { InstagramIcon, LucideIcon, MenuIcon, UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { Logo } from "~/components/common/Logo";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogMainSection,
  DialogTitle,
} from "~/components/ui/dialog";
import LoginProcess from "~/components/features/auth/login-process/LoginProcess";
import { Separator } from "~/components/ui/separator";
import { ArtDesign } from "../ArtDesign";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useSession } from "next-auth/react";
import { getRoleByValue } from "~/components/features/user/utils";

// menu components
type MenuItemShape = {
  text: string;
  link: string;
  rightSpace?: boolean;
};

const HeaderMenuItem = ({ link, text, rightSpace = false }: MenuItemShape) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li
      className={cn("lg:text-sm xl:text-base", {
        "lg:mr-auto": rightSpace,
      })}
    >
      <Link
        className={cn({
          "border-b border-primary text-primary": isActive,
        })}
        href={link}
      >
        {text}
      </Link>
    </li>
  );
};

const HeaderMenu = () => {
  const menuItems: MenuItemShape[] = [
    {
      link: "/",
      text: "صفحه اصلی",
    },
    {
      link: "/education",
      text: "آموزش",
    },
    {
      link: "/news",
      text: "اخبار",
    },
    {
      link: "/clubs",
      text: "لیست باشگاه ها",
    },
    {
      link: "/board",
      text: "هیئت رئیسه",
    },
    {
      link: "/representatives",
      text: "نماینده ها",
    },
    {
      rightSpace: true,
      link: "/about-us",
      text: "درباره ما",
    },
    {
      link: "/connect-us",
      text: "تماس با ما",
    },
  ];
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-6">
      {menuItems.map((menuItem, i) => (
        <HeaderMenuItem
          key={i}
          text={menuItem.text}
          link={menuItem.link}
          rightSpace={menuItem.rightSpace}
        />
      ))}
    </ul>
  );
};

// user components
const User = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const isLoading = status === "loading";
  const isLogin = status === "authenticated";

  const onClick = () => {
    if (isLogin) {
      const role = getRoleByValue(user!.roles[0]);
      if (!role) return;
      router.push(role.path);
    } else {
      setDialogOpen(true);
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button
        className="max-lg:size-8 bg-white lg:bg-primary text-black lg:text-primary-foreground lg:!px-10 rounded-full"
        onClick={onClick}
        disabled={isLoading}
      >
        <span className="hidden lg:block">ورود به پنل کاربری</span>
        <UserIcon className="size-4 lg:hidden" />
      </Button>
      <DialogContent className="!max-w-6xl py-10 bg-layer text-layer-foreground border-border/30">
        <div className="absolute left-10 bottom-10 opacity-30 max-lg:hidden">
          <ArtDesign side="Left" />
        </div>
        <div className="absolute right-10 top-10 opacity-30">
          <ArtDesign side="Right" />
        </div>
        <DialogHeader>
          <DialogTitle className="font-medium">
            <div className="flex justify-center items-center gap-x-6">
              <p className="text-primary">ورود</p>
              <Separator
                orientation="vertical"
                className="!h-8 !w-0.5 rounded-full"
              />
              <p className="text-layer-foreground">ثبت نام</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogMainSection>
          <div className="lg:max-w-1/2 mx-auto pt-10">
            <LoginProcess onDone={() => setDialogOpen(false)} />
          </div>
        </DialogMainSection>
      </DialogContent>
    </Dialog>
  );
};

// social media components
type SocialMediaShape = {
  icon: LucideIcon; // TODO: change this to image url
};

const SocialMediaItem = ({ icon: Icon }: SocialMediaShape) => {
  return (
    <li>
      <Button asChild>
        <a
          href="http://google.com"
          target="_blank"
          className="!size-9 bg-transparent lg:bg-primary"
        >
          <Icon className="size-4 lg:size-[25px]" />
        </a>
      </Button>
    </li>
  );
};

const SocialMedia = () => {
  const socialMedia: SocialMediaShape[] = [{ icon: InstagramIcon }];

  return (
    <ul className="lg:me-2">
      {socialMedia.map((item, i) => (
        <SocialMediaItem key={i} icon={item.icon} />
      ))}
    </ul>
  );
};

// mobile
const SheetMenu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <MenuIcon className="size-4" />
      </SheetTrigger>
      <SheetContent className="bg-layer text-layer-foreground border-layer-foreground/40 pr-6">
        <SheetHeader />
        <HeaderMenu />

        <div className="flex justify-end pl-3">
          <SocialMedia />
        </div>
        <div className="opacity-40">
          <ArtDesign side="Right" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// the header
export const Header = () => {
  return (
    <header className="bg-layer text-layer-foreground z-50 sticky top-0 p-4">
      <div className="flex items-center">
        <SheetMenu />
        <div className="hidden lg:block grow">
          <HeaderMenu />
        </div>
        <div className="hidden lg:block mr-4">
          <SocialMedia />
        </div>
        <div className="mr-auto lg:mr-0">
          <User />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 lg:-translate-y-0 lg:top-4 -translate-x-1/2">
        <Link href={"/"}>
          <Logo className="w-10 lg:w-36" />
        </Link>
      </div>
    </header>
  );
};
