"use client";

import Image from "next/image";
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
import { GallerySlide } from "~/components/features/gallery/types";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { ComingSoon } from "~/components/seactions/ComingSoon";

type GalleryProps = {
  slides: GallerySlide[];
};
export const Gallery = ({ slides }: GalleryProps) => {
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
    <Dialog>
      <Carousel
        className="w-full select-none bg-layer text-layer-foreground"
        opts={{ direction: "rtl", loop: true, watchDrag: false }}
        plugins={[Autoplay({ delay: 4000 }), Fade()]}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Card className="h-[600px] max-h-screen p-0 relative border-none">
                <Image
                  src={slide.url}
                  alt="gallery"
                  width={800}
                  height={800}
                  className="size-full object-cover object-center"
                />

                <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full flex flex-col max-md:gap-y-6">
                  <div className="flex items-center">
                    <div className="h-[6px] flex-1 rounded-e-full bg-primary md:bg-transparent"></div>
                    <div className="font-bold md:text-[40px] text-nowrap px-10 text-white leading-3">
                      انجمن شیتوریو کاراته دو ایران
                    </div>
                    <div className="hidden md:block h-[6px] w-1/2 rounded-s-full"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="hidden md:block h-[6px] bg-primary w-1/2 rounded-e-full"></div>
                    <div className="font-bold md:text-[40px] text-nowrap px-10 text-white">
                      میراثی کهن، قدرتی نوین
                    </div>
                    <div className="h-[6px] bg-primary flex-1 rounded-s-full"></div>
                  </div>
                  <div className="flex justify-center mt-8">
                    <DialogTrigger asChild>
                      <Button className="w-1/2 !rounded-full">
                        ثبت نام در کلاس های آموزشی
                      </Button>
                    </DialogTrigger>
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
      </Carousel>
      <DialogContent>
        <ComingSoon content="این بخش به زودی در دسترس قرار خواهد گرفت" />
      </DialogContent>
    </Dialog>
  );
};
