"use client";

import { InstagramIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

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
          underline: isActive,
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
      text: "لیست باشکاه ها",
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
    <Button asChild>
      <Link href={"/"}>ورود به پنل</Link>
    </Button>
  );
};

// social media components
type SocialMediaShape = {
  icon: any; // TODO: change this to image url
};

const SocialMediaItem = ({ icon: Icon }: SocialMediaShape) => {
  return (
    <li>
      <a href="http://google.com" target="_blank">
        <Icon />
      </a>
    </li>
  );
};

const SocialMedia = () => {
  const socialMedia: SocialMediaShape[] = [{ icon: InstagramIcon }];

  return (
    <ul>
      {socialMedia.map((item, i) => (
        <SocialMediaItem key={i} icon={item.icon} />
      ))}
    </ul>
  );
};

export const Header = () => {
  return (
    <header className="flex items-center gap-x-10 bg-black text-white p-4">
      <HeaderMenu />
      <span className="flex-1"></span>
      <SocialMedia />
      <User />
    </header>
  );
};
