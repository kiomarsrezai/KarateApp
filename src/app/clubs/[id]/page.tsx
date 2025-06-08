import { MapPin, PhoneIcon } from "lucide-react";
import { Banner } from "./Banner";
import { getClubApi } from "~/components/features/club/api";
import { notFound } from "next/navigation";

type SingleClubPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const SingleClubPage = async ({ params }: SingleClubPageProps) => {
  const { id } = await params;

  const club = await getClubApi(+id);
  if (!club) return notFound();

  return (
    <div>
      <Banner club={club} />

      <div className="mt-8 container mb-10">
        <ul className="flex flex-col gap-y-2">
          <li>{club.manager}</li>
          <li>{club.address}</li>
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
