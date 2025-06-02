import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

type ArtItemProps = {
  side: "Left" | "Right";
};

const ArtItem = ({ side }: ArtItemProps) => {
  const imageUrl =
    side == "Right"
      ? `/art/art-${side}-side.jpg`
      : side === "Left"
      ? `/art/art-${side}-side.jpg`
      : null;

  if (!imageUrl) return null;

  return <Image src={imageUrl} alt="art right side" width={200} height={200} />;
};

const BannerContent = () => {
  return (
    <div>
      <p>پنل کاربری به زودی در دسترس قرار خواهد گرفت</p>
      <Button>
        <InfoIcon className="me-2" />
        مشاهده لیست خدمات سایت انجمن
      </Button>
    </div>
  );
};

export const Banner = () => {
  return (
    <section className="bg-black text-white flex items-center justify-between rounded-xl overflow-hidden">
      <ArtItem side="Right" />

      <BannerContent />

      <ArtItem side="Left" />
    </section>
  );
};
