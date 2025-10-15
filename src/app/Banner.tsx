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

type FeatureItem = {
  text: string;
  link: string;
};

// feature components
const FeaturesContent = () => {
  const items: FeatureItem[] = [
    { text: "دریافت فایل راهنما", link: "/pdf/guide.pdf" },
    { text: "لینک ثبت نام", link: "https://www.ikf.ir" },
  ];
  return (
    <DialogContent className="bg-[#FAF3E2]">
      <DialogHeader>
        <DialogTitle className="text-center text-black font-medium">
          دریافت فایل راهنمای ثبت نام و لینک ثبت نام
        </DialogTitle>
      </DialogHeader>
      <DialogMainSection>
        <ul className="flex flex-col gap-y-2">
          {items.map((item, i) => (
            <li key={i}>
              <a href={item.link} target="_blank">
                <div className="flex items-center gap-x-2 text-sm">
                  <ShieldCheckIcon className="size-6 fill-[#79528A] stroke-[#fff]" />
                  {item.text}
                </div>
              </a>
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
      <p className="text-center md:text-[30px]">
        ثبت نام در مسابقات کشوری ۱۴۰۴
      </p>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full md:!bg-[#F5E8C7] md:!text-black">
            <InfoIcon className="me-2 md:fill-black md:stroke-[#F5E8C7] size-5" />
            دریافت فایل راهنمای ثبت نام و لینک ثبت نام
          </Button>
        </DialogTrigger>

        <FeaturesContent />
      </Dialog> */}
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
