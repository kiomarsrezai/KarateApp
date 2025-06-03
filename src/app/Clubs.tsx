import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const Club = () => {
  return (
    <Card className="p-0 pt-4 shadow-none">
      <CardContent className="px-4">
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
          <strong>نام باشگاه</strong>
          <p className="w-1/2">با مدیریت :</p>
        </div>
        <p className="mt-2">آدرس باشگاه :</p>

        <div className="flex justify-center mt-10 mb-1">
          <Button asChild variant={"ghost"}>
            <Link href={"/"} className="!text-primary text-sm">
              اطلاعات بیشتر
              <ArrowLeftIcon />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const Clubs = () => {
  return (
    <section className="flex flex-col gap-y-8">
      <h3 className="text-center text-2xl font-bold">باشگاه ها</h3>
      <div className="grid grid-cols-3 gap-x-10">
        <Club />
        <Club />
        <Club />
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
