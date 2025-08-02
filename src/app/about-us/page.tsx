import Image from "next/image";
import { AddressList } from "~/components/seactions/AddressList";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const AboutUsPage = () => {
  return (
    <div className="container mt-28 mb-10">
      <h3 className="text-4xl font-bold">درباره ما</h3>
      <div className="mt-6">
        <div className="rounded-md overflow-hidden">
          <AspectRatio ratio={16 / 4} className="w-full">
            <Image
              src={"/img/connect-us.jpg"}
              width={600}
              height={300}
              alt="about us"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="mt-16 ">
        <AddressList />
      </div>

      {/* <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-10">
        <div className="[&>p]:mb-2 order-2 sm:order-1">
          <p>
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
            است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
        </div>
        <div className="rounded-md overflow-hidden w-full max-w-[600px] shrink-0 order-1 sm:order-2">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={"/img/connect-us.jpg"}
              width={600}
              height={300}
              alt="about us"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div> */}
    </div>
  );
};

export default AboutUsPage;
