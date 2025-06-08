import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { getClubsApi } from "~/components/features/club/api";
import { ClubCard } from "~/components/features/club/ClubCard";
import { Button } from "~/components/ui/button";

export const Clubs = async () => {
  const clubs = await getClubsApi();

  return (
    <section className="flex flex-col gap-y-8">
      <h3 className="text-center text-2xl font-bold">باشگاه ها</h3>
      <div className="grid md:grid-cols-3 gap-10">
        {clubs.splice(0, 3).map((club, i) => (
          <ClubCard key={i} club={club} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild variant={"ghost"} size={"lg"}>
          <Link href={"/"} className="!text-primary !text-lg">
            لیست باشگاه ها
            <ArrowLeftIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
};
