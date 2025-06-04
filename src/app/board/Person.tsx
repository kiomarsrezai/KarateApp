import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export const Person = () => {
  return (
    <div className="mb-10">
      <div className="rounded-xl overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="person"
            width={200}
            height={200}
            className="size-full"
          />
        </AspectRatio>
      </div>
      <div className="mt-2">
        <p className="text-foreground/70">مدیر عامل</p>
        <p className="font-semibold">نام و نام خانوادگی</p>
      </div>
    </div>
  );
};
