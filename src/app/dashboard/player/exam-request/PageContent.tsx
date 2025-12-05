"use client";

import { useSession } from "next-auth/react";
import { ExamRequestForm } from "~/components/features/exam-request/ExamRequestForm";
import { Skeleton } from "~/components/ui/skeleton";
import { PaymentRequired } from "~/components/common/PaymentRequired";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <Skeleton className="h-64" />;
  }

  // اگر عضویت پرداخت نشده باشد، اول باید حق عضویت را پرداخت کند
  if (!user.isMembershipPaid) {
    return <PaymentRequired />;
  }

  return <ExamRequestForm user={user} />;
};
