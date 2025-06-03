import { Banner } from "./Banner";
import { Clubs } from "./Clubs";
import { Gallery } from "./Gallery";
import { News } from "./News";

const HomePage = () => {
  return (
    <>
      <Gallery />
      <Banner />
      <div className="mt-10">
        <Clubs />
      </div>
      <div className="mt-10">
        <News />
      </div>
    </>
  );
};

export default HomePage;
