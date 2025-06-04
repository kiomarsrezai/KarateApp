"use client";

import {
  CopyrightIcon,
  InstagramIcon,
  LucideIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "~/components/common/Logo";
import { cn } from "~/lib/utils";

// menu components
type MenuItemShape = {
  text: string;
  link: string;
};

const MenuListItem = ({ link, text }: MenuItemShape) => {
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

const MenuList = () => {
  const menuItems: MenuItemShape[] = [
    {
      link: "/",
      text: "صفحه اصلی",
    },
    {
      link: "/2",
      text: "تماس با ما",
    },
    {
      link: "/3",
      text: "درباره ما",
    },
    {
      link: "/4",
      text: "لیست باشگاه ها",
    },
    {
      link: "/5",
      text: "اخبار",
    },
    {
      link: "/6",
      text: "آموزش",
    },
  ];

  return (
    <ul className="flex flex-col gap-y-5">
      {menuItems.map((item, i) => (
        <MenuListItem key={i} link={item.link} text={item.text} />
      ))}
    </ul>
  );
};

// addess menu components
type AddressItemShape = {
  text: string;
  icon: LucideIcon;
};

const AddressListItem = ({ icon: Icon, text }: AddressItemShape) => {
  return (
    <li>
      <div className="flex gap-x-5 items-center justify-end">
        <span className="text-left">{text}</span>
        <Icon className="shrink-0 size-5" />
      </div>
    </li>
  );
};

const AddressList = () => {
  const addressItems: AddressItemShape[] = [
    {
      icon: PhoneIcon,
      text: "021-88319046 | 09193655764 | 09126032927",
    },
    {
      icon: InstagramIcon,
      text: "",
    },
    {
      icon: MapPinIcon,
      text: "نشانی دفتر مرکزی: تهران – میدان هفتم تیر – پائین تر از مسجد الجواد – خیابان مانی – پلاک 28 -  موسسه فرهنگی هنری قرن 21",
    },
    {
      icon: MailIcon,
      text: "info@Iranshitoryu.com",
    },
  ];

  return (
    <ul className="flex flex-col gap-y-6">
      {addressItems.map((item, i) => (
        <AddressListItem key={i} icon={item.icon} text={item.text} />
      ))}
    </ul>
  );
};

// the footer
export const Footer = () => {
  return (
    <footer className="bg-layer text-layer-foreground pt-10">
      <div className="flex gap-x-10 container">
        <MenuList />
        <span className="flex-1"></span>
        <div className="w-[500px]">
          <AddressList />
        </div>
        <Logo className="size-[260px]" />
      </div>

      <div className="text-center py-10 pb-4">
        <CopyrightIcon className="size-4 inline" /> تمام حقوق این سایت متعلق به
        انجمن شیتوریو کاراته دو ایران میباشد
      </div>
    </footer>
  );
};
