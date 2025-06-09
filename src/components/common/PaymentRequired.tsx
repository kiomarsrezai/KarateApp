"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { payPlanApi } from "../features/payment/api";

export const PaymentRequired = () => {
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
      <p className="text-center font-bold md:text-xl">
        جهت استفاده از خدمات سایت و پنل کاربری لطفا ابتدا مبلغ ورودی را
        بپردازید.
      </p>
      <div className="flex justify-center">
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
