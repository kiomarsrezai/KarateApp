"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRoleByValue } from "~/components/features/user/utils";
import { Button } from "~/components/ui/button";

type PageContentProps = {
  isPaymentSuccess: boolean;
};
export const PageContent = ({ isPaymentSuccess }: PageContentProps) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const isLoading = status === "loading";
  const isLogin = status === "authenticated";

  const onClick = () => {
    if (isLogin) {
      const role = getRoleByValue(user!.roles[0]);
      if (!role) return;
      router.push(role.path);
    }
  };

  return (
    <div className="container my-10">
      <div className="bg-black py-62 flex flex-col gap-y-10">
        <div className="flex justify-center items-center gap-x-2">
          <div className="size-6 bg-white rounded-full flex justify-center items-center">
            {isPaymentSuccess ? (
              <CheckIcon className="size-5" />
            ) : (
              <XIcon className="size-5" />
            )}
          </div>

          <p className="text-3xl text-center text-white">
            {isPaymentSuccess
              ? "پرداخت با موفقیت انجام شد"
              : "پرداخت با مشکل مواجه شد"}
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            className="w-full md:w-[400px] !rounded-full bg-transparent border border-primary"
            disabled={isLoading}
            onClick={onClick}
          >
            ورود به پنل کاربری
          </Button>
        </div>
      </div>
    </div>
  );
};
