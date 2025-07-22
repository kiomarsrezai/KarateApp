import { getPaymentResultApi } from "~/components/features/payment/api";
import { PageContent } from "./PageContent";
import { redirect } from "next/navigation";

type PaymentResultPageProps = {
  searchParams: Promise<Record<string, string>>;
};
const PaymentResultPage = async ({ searchParams }: PaymentResultPageProps) => {
  const allParams = await searchParams;
  const guid = allParams.guid;
  const transactionId = allParams.trans_id;
  const idGet = allParams.id_get;
  if (!guid || !transactionId || !idGet) {
    return redirect("/");
  }

  const result = await getPaymentResultApi({
    guid,
    id_get: idGet,
    trans_id: transactionId,
  });

  return (
    <div>
      <PageContent isPaymentSuccess={result.success} />
    </div>
  );
};

export default PaymentResultPage;
