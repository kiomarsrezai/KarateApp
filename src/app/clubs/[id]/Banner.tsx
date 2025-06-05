"use client";

import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { useIsMobile } from "~/hooks/use-mobile";

export const Banner = () => {
  const mobile = useIsMobile();

  return (
    <div className="relative">
      <AspectRatio ratio={mobile ? 16 / 9 : 35 / 9}>
        <Image
          src={
            "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="club"
          width={800}
          height={800}
          className="size-full object-cover"
        />
      </AspectRatio>

      <div className="absolute left-1/2 top-1/2 -translate-1/2 text-lg text-white">
        {'"نام باشگاه"'}
      </div>
    </div>
  );
};
