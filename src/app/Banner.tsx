import { InfoIcon, ShieldCheckIcon } from "lucide-react";
import { ArtDesign } from "~/components/seactions/ArtDesign";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogMainSection,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

// feature components
const FeaturesContent = () => {
  const items = [
    "ثبت نام در سایت و تشکیل پنل کاربری",
    "به زودی دیگر خدمات در دسترس قرار میگیرد",
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
    <div className="flex flex-col gap-y-12 relative">
      <a
        className="text-center md:text-[30px]"
        href="/pdf/guide.pdf"
        target="_blank"
      >
        ثبت نام در مسابقات کشوری ۱۴۰۴
      </a>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full md:!bg-[#F5E8C7] md:!text-black">
            <InfoIcon className="me-2 md:fill-black md:stroke-[#F5E8C7] size-5" />
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
    <section className="bg-layer text-layer-foreground flex items-center justify-center rounded-2xl overflow-hidden py-10 -mt-4 relative min-h-80">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 max-md:opacity-30">
        <ArtDesign side="Right" />
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 max-md:opacity-30">
        <ArtDesign side="Left" />
      </div>

      <BannerContent />
    </section>
  );
};
