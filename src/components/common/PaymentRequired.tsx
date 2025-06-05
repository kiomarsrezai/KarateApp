import { Button } from "../ui/button";

export const PaymentRequired = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-center font-bold text-xl">
        جهت استفاده از خدمات سایت و پنل کاربری لطفا ابتدا مبلغ ورودی را
        بپردازید.
      </p>
      <div className="flex justify-center">
        <Button asChild>
          <a className="w-[400px] !rounded-full" href="https://google.com">
            پرداخت
          </a>
        </Button>
      </div>
    </div>
  );
};
