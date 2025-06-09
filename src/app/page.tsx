import { getGallerySlidesApi } from "~/components/features/gallery/api";
import { Banner } from "./Banner";
import { Clubs } from "./Clubs";
import { Gallery } from "./Gallery";
import { News } from "./News";

const HomePage = async () => {
  const slides = await getGallerySlidesApi();

  return (
    <>
      <Gallery slides={slides} />
      <Banner />
      <div className="mt-10 container">
        <Clubs />
      </div>
      <div className="mt-10 container mb-16">
        <News />
      </div>
    </>
  );
};

export default HomePage;
