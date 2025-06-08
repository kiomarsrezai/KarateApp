import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { BoardMember } from "./types";
import { getFilePathWithDefault } from "~/lib/utils";

type PersonCardProps = {
  person: BoardMember;
};

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div className="mb-10">
      <div className="rounded-xl overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={getFilePathWithDefault(person.imagePath)}
            alt="person"
            width={200}
            height={200}
            className="size-full"
          />
        </AspectRatio>
      </div>
      <div className="mt-2">
        <p className="text-foreground/70">{person.position}</p>
        <p className="font-semibold">{person.fullName}</p>
      </div>
    </div>
  );
};
