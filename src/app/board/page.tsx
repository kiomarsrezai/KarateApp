import { BoardMembers } from "./BoardMembers";

const BoardPage = () => {
  return (
    <div className="mt-16 container">
      <h2 className="font-bold text-2xl">هیئت رئیسه</h2>
      <BoardMembers />
    </div>
  );
};

export default BoardPage;
