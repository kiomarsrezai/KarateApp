import { SearchParams } from "nuqs";
import { IntroductionMembers } from "./IntroductionMembers";
import { loadSearchParams } from "./searchParams";
import { IntroductionMenu } from "./IntroductionMenu";

type BoardPageProps = {
  searchParams: Promise<SearchParams>;
};

const BoardPage = async ({ searchParams }: BoardPageProps) => {
  const { filter } = await loadSearchParams(searchParams);

  return (
    <div className="mt-16 container">
      <h2 className="font-bold text-2xl">معرفی اعضا</h2>
      <div className="flex flex-col sm:flex-row max-sm:gap-y-4 sm:gap-x-10 mb-10 mt-10 ">
        <IntroductionMenu />
        <IntroductionMembers filter={filter} />
      </div>
    </div>
  );
};

export default BoardPage;
