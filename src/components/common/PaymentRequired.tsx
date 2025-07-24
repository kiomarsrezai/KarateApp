"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { payPlanApi } from "../features/payment/api";
import { Card } from "../ui/card";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

type PaymentItemProps = {
  mode: number;
  setMode: (newMode: number) => void;
  label: string;
  value: number;
  disabled?: boolean;
};

const PaymentItem = ({
  mode,
  setMode,
  label,
  value,
  disabled,
}: PaymentItemProps) => {
  return (
    <Card
      className={cn("p-6 flex flex-row items-center gap-x-4 shadow-none", {
        "cursor-not-allowed opacity-50": disabled,
        "cursor-pointer": !disabled,
      })}
      onClick={() => {
        if (!disabled) setMode(value);
      }}
    >
      <div
        className={cn("size-6 rounded-full border", {
          "bg-primary": mode === value,
        })}
      ></div>
      <p>{label}</p>
    </Card>
  );
};

export const PaymentRequired = () => {
  const [mode, setMode] = useState(1);
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: payPlanApi,
    onSuccess(data) {
      router.push(data.link);
    },
  });

  const onPay = () => {
    mutation.mutate({
      userId: String(user?.id ?? ""),
      isTest: false,
      redirectUrl: `${window.origin}/payment-result`,
      api: "rest",
    });
  };
  return (
    <div className="flex flex-col gap-y-3">
      <PaymentItem
        label="اتصال با درگاه پرداخت"
        mode={mode}
        setMode={setMode}
        value={1}
      />

      <PaymentItem
        label="واریز کارت به کارت و ارسال تصویر فیش واریزی"
        mode={mode}
        setMode={setMode}
        value={2}
        disabled
      />

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
