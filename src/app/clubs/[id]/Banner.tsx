"use client";

import Image from "next/image";
import { Club } from "~/components/features/club/types";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { useIsMobile } from "~/hooks/use-mobile";
import { getFilePathWithDefault } from "~/lib/utils";

type BannerProps = {
  club: Club;
};

export const Banner = ({ club }: BannerProps) => {
  const mobile = useIsMobile();

  return (
    <div className="relative">
      <AspectRatio ratio={mobile ? 16 / 9 : 35 / 9}>
        <Image
          src={getFilePathWithDefault(club.imageFile)}
          alt="club"
          width={800}
          height={800}
          className="size-full object-cover"
        />
      </AspectRatio>

      <div className="absolute left-1/2 top-1/2 -translate-1/2 text-lg text-white">
        {club.name}
      </div>
    </div>
  );
};
