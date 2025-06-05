"use client";

import { InstagramIcon, LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { Logo } from "~/components/common/Logo";
import { useState } from "react";
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

// menu components
type MenuItemShape = {
  text: string;
  link: string;
};

const HeaderMenuItem = ({ link, text }: MenuItemShape) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li>
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
      link: "/2",
      text: "آموزش",
    },
    {
      link: "/3",
      text: "اخبار",
    },
    {
      link: "/4",
      text: "لیست باشگاه ها",
    },
    {
      link: "/5",
      text: "درباره ما",
    },
    {
      link: "/board",
      text: "هیئت رئیسه",
    },
    {
      link: "/6",
      text: "تماس با ما",
    },
  ];
  return (
    <ul className="flex items-center gap-x-6">
      {menuItems.map((menuItem, i) => (
        <HeaderMenuItem key={i} text={menuItem.text} link={menuItem.link} />
      ))}
    </ul>
  );
};

// user components
const User = () => {
  const isLogin = false;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClick = () => {
    if (isLogin) {
      // navigate
    } else {
      setDialogOpen(true);
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button className="px-10 rounded-full" onClick={onClick}>
        ورود به پنل کاربری
      </Button>
      <DialogContent className="!max-w-[calc(100vw-100px)] !h-[calc(100vh-100px)] bg-layer text-layer-foreground border-border/30">
        <div className="absolute left-10 bottom-10 opacity-30">
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
          <div className="max-w-1/2 mx-auto pt-10">
            <LoginProcess />
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
        <a href="http://google.com" target="_blank" className="!size-9">
          <Icon className="size-[25px]" />
        </a>
      </Button>
    </li>
  );
};

const SocialMedia = () => {
  const socialMedia: SocialMediaShape[] = [{ icon: InstagramIcon }];

  return (
    <ul className="me-2">
      {socialMedia.map((item, i) => (
        <SocialMediaItem key={i} icon={item.icon} />
      ))}
    </ul>
  );
};

// the header
export const Header = () => {
  return (
    <header className="bg-layer text-layer-foreground z-50 sticky top-0">
      <div className="flex items-center py-4 container">
        <HeaderMenu />
        <span className="flex-1"></span>
        <SocialMedia />
        <User />
      </div>

      <div className="absolute left-1/2 top-4 -translate-x-1/2">
        <Logo className="w-40" />
      </div>
    </header>
  );
};
