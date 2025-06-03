"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Logo } from "~/components/common/Logo";

export const Gallery = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const count = 5;

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      className="w-full select-none bg-layer text-layer-foreground"
      opts={{ direction: "rtl", loop: true, watchDrag: false }}
      plugins={[Autoplay({ delay: 4000 }), Fade()]}
      setApi={setApi}
    >
      <CarouselContent>
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="h-[600px] max-h-screen p-0 relative border-none">
              <Image
                src={
                  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="gallery"
                width={800}
                height={800}
                className="size-full object-cover object-center"
              />

              <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full">
                <div className="flex items-center">
                  <div className="h-[6px] flex-1 rounded-e-full"></div>
                  <div className="font-bold text-[40px] text-nowrap px-10 text-white leading-3">
                    انجمن شیتوریو کاراته دو ایران
                  </div>
                  <div className="h-[6px] w-1/2 rounded-s-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-[6px] bg-primary w-1/2 rounded-e-full"></div>
                  <div className="font-bold text-[40px] text-nowrap px-10 text-white">
                    میراثی کهن، قدرتی نوین
                  </div>
                  <div className="h-[6px] bg-primary flex-1 rounded-s-full"></div>
                </div>
                <div className="flex justify-center mt-8">
                  <Button asChild>
                    <Link className="w-1/2 !rounded-full" href={"/"}>
                      ثبت نام در کلاس های آموزشی
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ul className="flex gap-x-3">
          {Array.from({ length: count })
            .fill(null)
            .map((_, i) => (
              <li key={i}>
                <button
                  className={cn("size-3 rounded-full bg-white", {
                    "bg-primary": current === i + 1,
                  })}
                  onClick={() => api?.scrollTo(i)}
                ></button>
              </li>
            ))}
        </ul>
      </div>

      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3">
        <Logo className="w-40" />
      </div>
    </Carousel>
  );
};
