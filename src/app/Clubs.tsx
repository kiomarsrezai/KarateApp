import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

const Club = () => {
  return (
    <Card>
      <CardContent>
        <Image
          src={
            "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="club"
          width={200}
          height={200}
          className="w-full"
        />
        <div className="flex justify-between">
          <strong>نام باشگاه</strong>
          <p>با مدیریت :</p>
        </div>
        <p>آدرس باشگاه :</p>
      </CardContent>
    </Card>
  );
};

export const Clubs = () => {
  return (
    <section className="flex flex-col gap-y-8">
      <h3 className="text-center">باشگاه ها</h3>
      <div className="grid grid-cols-3 gap-x-10">
        <Club />
        <Club />
        <Club />
      </div>
      <div className="flex justify-center">
        <Button asChild variant={"ghost"}>
          <Link href={"/"}>
            لیست باشگاه ها
            <ArrowLeftIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
};
