import { MapPin, PhoneIcon } from "lucide-react";
import { Banner } from "./Banner";

const SingleClubPage = () => {
  return (
    <div>
      <Banner />

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
