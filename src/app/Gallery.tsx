import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

export const Gallery = () => {
  return (
    <Carousel className="w-full" opts={{ direction: "rtl" }}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="h-[600px] max-h-screen p-0 relative">
              <Image
                src={
                  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="gallery"
                width={800}
                height={800}
                className="size-full object-cover object-center"
              />

              <div className="absolute left-1/2 top-1/2 -translate-1/2">
                <div>انجمن شیتوریو کاراته دو ایران</div>
                <div>میراثی کهن، قدرتی نوین</div>
                <Button asChild>
                  <Link href={"/"}>ثبت نام در کلاس های آموزشی</Link>
                </Button>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
