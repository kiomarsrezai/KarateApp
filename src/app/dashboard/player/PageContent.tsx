"use client";

import { useSession } from "next-auth/react";
import { PaymentRequired } from "~/components/common/PaymentRequired";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isPaid = !!user?.membershipPaidDate;

  if (isPaid) {
    return <p>به کاراته خوش آمدید</p>;
  }

  return <PaymentRequired />;
};
