import Image from "next/image";
import { BoardMember } from "./types";
import { getFilePathWithDefault } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dialog";

type BoardDetailProps = {
  board: BoardMember;
};
export const BoardDetail = ({ board }: BoardDetailProps) => {
  return (
    <div>
      <div className="flex justify-between gap-x-20">
        <div>
          <p className="font-medium">{board.fullName}</p>
          <p>{board.position}</p>
          <p>{board.bio}</p>
        </div>
        <div>
          <div className="rounded-md overflow-hidden w-[300px]">
            <Image
              src={getFilePathWithDefault(board.imagePath)}
              alt="board"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-1">رزومه و توضیحات</p>
        <div dangerouslySetInnerHTML={{ __html: board.resumeHtml }}></div>
      </div>

      <div className="mt-10 flex justify-center">
        <DialogClose asChild>
          <Button
            className="w-2/3 rounded-full border-black"
            variant={"outline"}
          >
            بازگشت
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};
