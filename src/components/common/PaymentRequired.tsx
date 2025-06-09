"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { payPlanApi } from "../features/payment/api";
import { Card } from "../ui/card";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const PaymentRequired = () => {
  const [mode, setMode] = useState(1);
  const { data } = useSession();
  const user = data?.user;
  const mutation = useMutation({
    mutationFn: payPlanApi,
  });

  const onPay = () => {
    mutation.mutate({
      factorNumber: "1_000_000",
      amount: 1_000_000,
      name: user?.name ?? "",
      description: "پرداختی اشتراک",
      email: user?.email ?? "",
      mobile: user?.phoneNumber ?? "",
      redirectUrl: `${window.origin}/payment-result`,
    });
  };
  return (
    <div className="flex flex-col gap-y-3">
      <Card
        className="p-6 flex flex-row items-center gap-x-4 shadow-none"
        onClick={() => setMode(1)}
      >
        <div
          className={cn("size-6 rounded-full border", {
            "bg-primary": mode === 1,
          })}
        ></div>
        <p>نحوه پرداخت را انتخاب کنید</p>
      </Card>
      <Card
        className="p-6 flex flex-row items-center gap-x-4 shadow-none"
        onClick={() => setMode(2)}
      >
        <div
          className={cn("size-6 rounded-full border", {
            "bg-primary": mode === 2,
          })}
        ></div>
        <p>نحوه پرداخت را انتخاب کنید</p>
      </Card>
      <div className="flex justify-center mt-6">
        <Button
          className="w-full md:w-[400px] !rounded-full"
          onClick={onPay}
          loading={mutation.isPending}
        >
          پرداخت
        </Button>
      </div>
    </div>
  );
};
