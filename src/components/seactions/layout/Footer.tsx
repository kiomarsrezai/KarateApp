import {
  InstagramIcon,
  LucideIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "~/components/common/Logo";

// menu components
type MenuItemShape = {
  text: string;
  link: string;
};

const MenuListItem = ({ link, text }: MenuItemShape) => {
  return (
    <li>
      <Link href={link}>{text}</Link>
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
      link: "/",
      text: "تماس با ما",
    },
    {
      link: "/",
      text: "درباره ما",
    },
    {
      link: "/",
      text: "لیست باشگاه ها",
    },
    {
      link: "/",
      text: "اخبار",
    },
    {
      link: "/",
      text: "آموزش",
    },
  ];

  return (
    <ul className="flex flex-col gap-y-4">
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
      <div className="flex">
        <Icon />
        {text}
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
      text: "@instagram",
    },
    {
      icon: PinIcon,
      text: "نشانی دفتر مرکزی: تهران – میدان هفتم تیر – پائین تر از مسجد الجواد – خیابان مانی – پلاک 28 -  موسسه فرهنگی هنری قرن 21",
    },
    {
      icon: MailIcon,
      text: "info@Iranshitoryu.com",
    },
  ];

  return (
    <ul className="flex flex-col gap-y-4">
      {addressItems.map((item, i) => (
        <AddressListItem key={i} icon={item.icon} text={item.text} />
      ))}
    </ul>
  );
};

// the footer
export const Footer = () => {
  return (
    <footer className="grid grid-cols-3 bg-black text-white pt-10">
      <MenuList />
      <AddressList />
      <Logo />
    </footer>
  );
};
