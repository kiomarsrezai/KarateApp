import { MapPin, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const SingleClubPage = () => {
  return (
    <div>
      <div className="relative">
        <AspectRatio ratio={35 / 9}>
          <Image
            src={
              "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="club"
            width={800}
            height={800}
            className="size-full object-cover"
          />
        </AspectRatio>

        <div className="absolute left-1/2 top-1/2 -translate-1/2 text-lg text-white">
          {'"نام باشگاه"'}
        </div>
      </div>

      <div className="mt-8 container mb-10">
        <ul className="flex flex-col gap-y-2">
          <li>اطلاعات:</li>
          <li>اطلاعات:</li>
          <li>اطلاعات:</li>
          <li>اطلاعات:</li>
          <li>اطلاعات:</li>
          <li>اطلاعات:</li>
        </ul>

        <ul className="flex flex-col gap-y-2 mt-3">
          <li>
            <PhoneIcon className="size-5" />
          </li>
          <li>
            <MapPin className="size-5" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleClubPage;
