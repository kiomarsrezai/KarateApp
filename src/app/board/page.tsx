import { BoardMembers } from "./BoardMembers";

const BoardPage = () => {
  return (
    <div className="mt-16 container">
      <h2 className="font-bold text-2xl">اعضای هیئت رئیسه انجمن</h2>
      <BoardMembers />
    </div>
  );
};

export default BoardPage;
