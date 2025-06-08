import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card } from "~/components/ui/card";
import { News } from "./types";
import { getFilePathWithDefault } from "~/lib/utils";

type NewsCardProps = {
  newsItem: News;
};

export const NewsCard = ({ newsItem }: NewsCardProps) => {
  return (
    <Link href={`/news/${newsItem.newsId}`}>
      <Card className="relative p-0 overflow-hidden shadow-none">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={getFilePathWithDefault(newsItem.imageName)}
            alt="club"
            width={200}
            height={200}
            className="w-full"
          />
        </AspectRatio>
        <div className="flex absolute left-1/2 top-1/2 size-full -translate-1/2 bg-black/30 justify-center items-center text-white p-5">
          <strong className="md:text-lg">{newsItem.title}</strong>
        </div>
      </Card>
    </Link>
  );
};
