import {
  InstagramIcon,
  LucideIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

type AddressItemShape = {
  text: string;
  icon: LucideIcon;
};

const AddressListItem = ({ icon: Icon, text }: AddressItemShape) => {
  return (
    <li>
      <div className="flex gap-x-5 items-center">
        <Icon className="shrink-0 size-5" />
        <span className="font-medium">{text}</span>
      </div>
    </li>
  );
};

export const AddressList = () => {
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
