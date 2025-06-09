"use client";

import {
  CopyrightIcon,
  InstagramIcon,
  LucideIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "~/components/common/Logo";
import { Separator } from "~/components/ui/separator";
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
      <div className="flex gap-x-5 items-center">
        <Icon className="shrink-0 size-5" />
        <span>{text}</span>
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

// logos
const Logos = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo className="size-40 md:size-[220px] self-end md:self-start" />
      <div className="w-[130px] mx-auto mt-10">
        <p className="text-center mb-1">نماد ها</p>
        <Separator />
      </div>
      <a
        referrerPolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=600824&Code=0xLXI14GJWvlhgUJb4CBcmGIPUhBAvyN"
        className="mt-4"
      >
        <Image
          referrerPolicy="origin"
          src="https://trustseal.enamad.ir/logo.aspx?id=600824&Code=0xLXI14GJWvlhgUJb4CBcmGIPUhBAvyN"
          alt=""
          className="cursor-pointer"
          width={130}
          height={130}
        />
      </a>
    </div>
  );
};

// the footer
export const Footer = () => {
  return (
    <footer className="bg-layer text-layer-foreground pt-10">
      <div className="flex gap-10 container">
        <MenuList />
        <span className="flex-1"></span>
        <div className="hidden md:block w-[500px]">
          <AddressList />
        </div>
        <span className="flex-1"></span>
        <Logos />
      </div>

      <div className="text-center py-10 pb-4 text-xs md:text-base">
        <CopyrightIcon className="size-4 inline" /> تمام حقوق این سایت متعلق به
        انجمن شیتوریو کاراته دو ایران میباشد
      </div>
    </footer>
  );
};
