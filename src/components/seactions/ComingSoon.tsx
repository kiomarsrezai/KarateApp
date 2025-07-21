import Image from "next/image";

type ComingSoonProps = {
  content?: string;
};

export const ComingSoon = ({
  content = "این صفحه به زودی اضافه خواهد شد",
}: ComingSoonProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-[400px]">
      <Image
        src={"/img/coming-soon.png"}
        width={200}
        height={200}
        className="w-[50px]"
        alt="coming soon"
      />
      <p className="text-black/70">{content}</p>
    </div>
  );
};
