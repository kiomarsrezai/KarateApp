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
import { EditorViewer } from "~/components/common/editor-viewer";

type PersonCardProps = {
  person: BoardMember;
};

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="py-0">
          <CardContent className="p-3">
            <div className="rounded-xl overflow-hidden">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={getFilePathWithDefault(person.imagePath)}
                  alt="person"
                  width={200}
                  height={200}
                  className="size-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="mt-2">
              <p className="font-semibold">{person.fullName}</p>
              <p className="text-foreground/70">{person.position}</p>
              <div className="text-foreground/70">
                <EditorViewer content={person.bio} />
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="!max-w-4xl !rounded-[24px]"
      >
        <DialogMainSection className="p-8">
          <BoardDetail board={person} />
        </DialogMainSection>
      </DialogContent>
    </Dialog>
  );
};
