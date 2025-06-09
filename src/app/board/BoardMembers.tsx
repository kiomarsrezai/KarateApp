import { getBoardMembersApi } from "~/components/features/board/api";
import { PersonCard } from "~/components/features/board/PersonCard";
import { WidePersonCard } from "~/components/features/board/WidePersonCard";

export const BoardMembers = async () => {
  const boardMembers = await getBoardMembersApi();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-10">
      {boardMembers[0] && (
        <div className="sm:col-span-2 lg:col-span-4">
          <WidePersonCard person={boardMembers[0]} />
        </div>
      )}
      {boardMembers.splice(1).map((boardMember) => (
        <PersonCard key={boardMember.id} person={boardMember} />
      ))}
    </div>
  );
};
