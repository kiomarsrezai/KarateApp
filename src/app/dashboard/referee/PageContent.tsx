"use client";

import { useSession } from "next-auth/react";
import { DashboardComingSoon } from "~/components/seactions/layout/DashboardComingSoon";
import { PaymentRequired } from "~/components/common/PaymentRequired";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isPaid = !!user?.membershipPaidDate;

  if (!isPaid) {
    return <DashboardComingSoon />;
  }

  return <PaymentRequired />;
};
