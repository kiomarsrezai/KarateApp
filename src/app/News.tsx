import Image from "next/image";
import { Card } from "~/components/ui/card";

const NewsItem = () => {
  return (
    <Card className="relative p-0 overflow-hidden">
      <Image
        src={
          "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="club"
        width={200}
        height={200}
        className="w-full"
      />
      <div className="flex absolute left-1/2 top-1/2 size-full -translate-1/2 bg-black/30 justify-center items-center text-white">
        <strong>تیتر خبر</strong>
      </div>
    </Card>
  );
};

export const News = () => {
  return (
    <section className="flex flex-col gap-y-8">
      <h3 className="text-center">اخبار</h3>
      <div className="grid grid-cols-3 gap-x-10">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </section>
  );
};
