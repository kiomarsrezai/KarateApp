import { Person } from "./Person";

const BoardPage = () => {
  return (
    <div className="mt-16 container">
      <h2 className="font-bold text-2xl">هیئت رئیسه</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </div>
    </div>
  );
};

export default BoardPage;
