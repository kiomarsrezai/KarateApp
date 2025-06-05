import { PaymentRequired } from "~/components/common/PaymentRequired";

const PlayerHomePage = () => {
  return (
    <div className="p-6 md:p-30">
      <PaymentRequired />
    </div>
  );
};

export default PlayerHomePage;
