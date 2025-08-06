import { getClubsApi } from "~/components/features/club/api";
import { ClubCard } from "~/components/features/club/ClubCard";

const ClubsPage = async () => {
  const clubs = await getClubsApi();

  return (
    <div className="mt-10 lg:mt-28 pb-10  container">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <ClubCard club={club} key={club.id} />
        ))}
      </div>
    </div>
  );
};

export default ClubsPage;
