"use client";

import { useSession } from "next-auth/react";
import { ExamRequestForm } from "~/components/features/exam-request/ExamRequestForm";
import { Skeleton } from "~/components/ui/skeleton";
import { Card } from "~/components/ui/card";

export default function PlayerExamRequestPage() {
  const { data: session, status } = useSession();
  const user = session?.user as any; // اگر تایپ User داری می‌تونی جاش بذاری

  if (status === "loading") {
    return <Skeleton className="h-40" />;
  }

  if (!user) {
    return <div className="p-4">برای ثبت درخواست آزمون باید وارد حساب کاربری شوید.</div>;
  }

  // اگر منطق عضویت پرداخت‌شده داری، اینجا چک کن
  if (user.isMembershipPaid === false) {
    return (
      <Card className="p-4 space-y-2">
        <h1 className="font-bold text-lg">عضویت فعال نیست</h1>
        <p className="text-sm text-muted-foreground">
          برای ثبت درخواست آزمون، ابتدا باید حق عضویت خود را پرداخت کنید.
        </p>
      </Card>
    );
  }

  return <ExamRequestForm user={user} />;
}
