import { getNewsApi } from "~/components/features/news/api";
import { NewsCard } from "~/components/features/news/NewsCard";

export const News = async () => {
  const newsItems = await getNewsApi();
  return (
    <section className="flex flex-col gap-y-8">
      <h3 className="text-center text-2xl font-bold">اخبار</h3>
      <div className="grid md:grid-cols-3 gap-10">
        {newsItems.splice(0, 3).map((newsItem) => (
          <NewsCard key={newsItem.newsId} newsItem={newsItem} />
        ))}
      </div>
    </section>
  );
};
