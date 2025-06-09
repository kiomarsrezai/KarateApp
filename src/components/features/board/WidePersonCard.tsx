import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { BoardMember } from "./types";
import { getFilePathWithDefault } from "~/lib/utils";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogMainSection,
  DialogTrigger,
} from "~/components/ui/dialog";
import { BoardDetail } from "./BoardDetail";

type WidePersonCardProps = {
  person: BoardMember;
};

export const WidePersonCard = ({ person }: WidePersonCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="py-0">
          <CardContent className="p-3 flex flex-row gap-x-10 py-0 px-0">
            <div className="rounded-xl overflow-hidden w-1/2">
              <AspectRatio ratio={16 / 9}>
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
              <p className="font-semibold">{person.fullName}</p>
              <p className="text-foreground/70">{person.position}</p>
              <p className="text-foreground/70">{person.bio}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        closeWithClickOutside
        className="!max-w-4xl !rounded-[24px]"
      >
        <DialogMainSection className="p-8">
          <BoardDetail board={person} />
        </DialogMainSection>
      </DialogContent>
    </Dialog>
  );
};
