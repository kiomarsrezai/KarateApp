import { getSingleNewsApi } from "~/components/features/news/api";
import { Banner } from "./Banner";
import {} from "date-fns-jalali";

type SingleNewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const SingleNewsPage = async ({ params }: SingleNewsPageProps) => {
  const { id } = await params;
  const newsItem = await getSingleNewsApi(+id);

  return (
    <div className="pt-10 pb-10 container">
      <Banner newsItem={newsItem} />

      <div className="mt-3">
        <p className="text-sm">منبع :</p>
        <p className="text-sm mt-1">{}</p>
      </div>

      <div className="mt-3">{newsItem.description}</div>
    </div>
  );
};

export default SingleNewsPage;
