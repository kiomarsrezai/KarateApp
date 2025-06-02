import { Banner } from "./Banner";
import { Clubs } from "./Clubs";
import { News } from "./News";

const HomePage = () => {
  return (
    <>
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
