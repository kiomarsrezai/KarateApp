"use client";

import { InstagramIcon, LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Link from "next/link";

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
          "underline text-primary": isActive,
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
  return (
    <Button asChild className="px-10 rounded-full">
      <Link href={"/"}>ورود به پنل کاربری</Link>
    </Button>
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
    <header className="flex items-center bg-layer text-layer-foreground p-4">
      <HeaderMenu />
      <span className="flex-1"></span>
      <SocialMedia />
      <User />
    </header>
  );
};
