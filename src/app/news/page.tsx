import { getNewsApi } from "~/components/features/news/api";
import { NewsCard } from "~/components/features/news/NewsCard";

const NewsPage = async () => {
  const news = await getNewsApi();

  return (
    <div className="mt-10 lg:mt-28 pb-10  container">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((newsItem) => (
          <NewsCard newsItem={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
