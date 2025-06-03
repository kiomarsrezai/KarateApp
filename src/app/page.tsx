import { Banner } from "./Banner";
import { Clubs } from "./Clubs";
import { Gallery } from "./Gallery";
import { News } from "./News";

const HomePage = () => {
  return (
    <>
      <Gallery />
      <Banner />
      <div className="mt-10 container mx-auto">
        <Clubs />
      </div>
      <div className="mt-10 container mx-auto mb-16">
        <News />
      </div>
    </>
  );
};

export default HomePage;
