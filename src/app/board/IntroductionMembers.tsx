import { getBoardMembersApi } from "~/components/features/board/api";
import { PersonCard } from "~/components/features/board/PersonCard";
import { WidePersonCard } from "~/components/features/board/WidePersonCard";

const filterTypes = {
  board: 1,
  executive: 2,
  representatives: 3,
};

type IntroductionMembersProps = {
  filter: string;
};

export const IntroductionMembers = async ({
  filter,
}: IntroductionMembersProps) => {
  const persons = await getBoardMembersApi();

  const filtersPersons = persons.filter(
    (person) =>
      person.boardMemberTypeId ===
      filterTypes[filter as keyof typeof filterTypes]
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {filtersPersons[0] && (
        <div className="sm:col-span-2 lg:col-span-4">
          <WidePersonCard person={filtersPersons[0]} />
        </div>
      )}
      {filtersPersons.splice(1).map((boardMember) => (
        <PersonCard key={boardMember.id} person={boardMember} />
      ))}
    </div>
  );
};
