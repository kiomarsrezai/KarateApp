import { getBoardMembersApi } from "~/components/features/board/api";
import { PersonCard } from "~/components/features/board/PersonCard";

export const BoardMembers = async () => {
  const boardMembers = await getBoardMembersApi();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
      {boardMembers.map((boardMember) => (
        <PersonCard key={boardMember.id} person={boardMember} />
      ))}
    </div>
  );
};
