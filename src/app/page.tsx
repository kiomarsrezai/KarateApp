import { Banner } from "./Banner";
import { Clubs } from "./Clubs";

const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="mt-10">
        <Clubs />
      </div>
    </>
  );
};

export default HomePage;
