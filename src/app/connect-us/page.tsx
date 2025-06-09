import Image from "next/image";
import { AddressList } from "./AddressList";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const ConnectUsPage = () => {
  return (
    <div className="container mt-28 mb-10">
      <h3 className="text-4xl font-bold">تماس با ما</h3>
      <div className="mt-16 flex justify-between">
        <AddressList />
        <div className="rounded-md overflow-hidden w-[440px]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={"/img/connect-us.jpg"}
              alt="connect us"
              width={400}
              height={400}
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default ConnectUsPage;
