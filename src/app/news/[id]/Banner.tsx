"use client";

import Image from "next/image";
import { News } from "~/components/features/news/types";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { useIsMobile } from "~/hooks/use-mobile";
import { getFilePathWithDefault } from "~/lib/utils";

type BannerProps = {
  newsItem: News;
};
export const Banner = ({ newsItem }: BannerProps) => {
  const mobile = useIsMobile();

  return (
    <div className="rounded-xl overflow-hidden">
      <AspectRatio ratio={mobile ? 16 / 9 : 20 / 9}>
        <Image
          src={getFilePathWithDefault(newsItem.imageName)}
          alt="club"
          width={1600}
          height={1600}
          className="size-full object-cover object-[0%_75%]"
        />
      </AspectRatio>
    </div>
  );
};
