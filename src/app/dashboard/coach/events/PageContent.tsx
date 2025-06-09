"use client";

import { useSession } from "next-auth/react";
import { CommingSoon } from "~/components/common/CommingSoon";
import { PaymentRequired } from "~/components/common/PaymentRequired";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isPaid = !!user?.membershipPaidDate;

  if (isPaid) {
    return <CommingSoon />;
  }

  return <PaymentRequired />;
};
