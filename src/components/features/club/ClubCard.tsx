import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Club } from "./types";

type ClubCardProps = {
  club: Club;
};
export const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <>
      {/* desktop version */}
      <Card className="p-0 md:pt-4 shadow-none max-md:hidden">
        <CardContent className="px-0 md:px-4">
          <div className="rounded-lg overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={
                  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="club"
                width={200}
                height={200}
                className="w-full"
              />
            </AspectRatio>
          </div>
          <div className="flex justify-between mt-2">
            <strong>{club.name}</strong>
            <p className="w-1/2">با مدیریت : {club.manager}</p>
          </div>
          <p className="mt-2">آدرس باشگاه : {club.address}</p>

          <div className="flex justify-center mt-10 mb-1">
            <Button asChild variant={"ghost"}>
              <Link
                href={`/clubs/${club.name}`}
                className="!text-primary text-sm"
              >
                اطلاعات بیشتر
                <ArrowLeftIcon />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* mobile version */}
      <Link href={"/clubs/1"} className="md:hidden">
        <Card className="relative p-0 overflow-hidden shadow-none">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={
                "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="club"
              width={200}
              height={200}
              className="w-full"
            />
          </AspectRatio>
          <div className="flex absolute left-1/2 top-1/2 size-full -translate-1/2 bg-black/30 justify-center items-center text-white">
            <div className="w-full pr-6 text-sm flex flex-col gap-2">
              <p>{club.name}</p>
              <p>{club.address}</p>
              <p>{club.manager}</p>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
};
