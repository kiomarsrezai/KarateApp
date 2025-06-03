import { InfoIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogMainSection,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type ArtItemProps = {
  side: "Left" | "Right";
};

const ArtItem = ({ side }: ArtItemProps) => {
  const imageUrl =
    side == "Right"
      ? `/art/art-right-side.jpg`
      : side === "Left"
      ? `/art/art-left-side.jpg`
      : null;

  if (!imageUrl) return null;

  return <Image src={imageUrl} alt="art right side" width={240} height={240} />;
};

// feature components
const FeaturesContent = () => {
  const items = [
    "توضحات اول",
    "توضحات دوم",
    "توضحات سوم",
    "توضحات چهارم",
    "توضحات پنجم",
  ];
  return (
    <DialogContent className="bg-[#FAF3E2]">
      <DialogHeader>
        <DialogTitle className="text-center text-black font-medium">
          لیست خدمات انجمن شیتوریو کاراته دو ایران
        </DialogTitle>
      </DialogHeader>
      <DialogMainSection>
        <ul className="flex flex-col gap-y-2">
          {items.map((item, i) => (
            <li key={i}>
              <div className="flex items-center gap-x-2 text-sm">
                <ShieldCheckIcon className="size-6 fill-[#79528A] stroke-[#fff]" />
                {item}
              </div>
            </li>
          ))}
        </ul>
      </DialogMainSection>
    </DialogContent>
  );
};

const BannerContent = () => {
  return (
    <div className="flex flex-col gap-y-12">
      <p className="text-[30px]">پنل کاربری به زودی در دسترس قرار خواهد گرفت</p>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full !bg-[#F5E8C7] !text-black">
            <InfoIcon className="me-2 fill-black stroke-[#F5E8C7] size-5" />
            مشاهده لیست خدمات سایت انجمن
          </Button>
        </DialogTrigger>

        <FeaturesContent />
      </Dialog>
    </div>
  );
};

export const Banner = () => {
  return (
    <section className="bg-layer text-layer-foreground flex items-center justify-between rounded-2xl overflow-hidden py-10 -mt-4 relative">
      <ArtItem side="Right" />

      <BannerContent />

      <ArtItem side="Left" />
    </section>
  );
};
