import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { string, object, pipe, minLength, check, length } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";

const FormSchema = object({
  code: pipe(
    string(),
    minLength(1, "لطفا کد تایید را وارد کنید"),
    length(6, "لطفا کد تایید را وارد کنید"),
    check((value) => /^\d+$/.test(value), "فقط کاراکتر های عددی مجاز است")
  ),
});

type PhoneNumberFormProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const OtpForm = ({ onNext }: PhoneNumberFormProps) => {
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    onNext();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-center">
                <FormLabel className="font-normal">کد تایید 6 رقمی</FormLabel>
              </div>
              <div dir="ltr" className="flex justify-center mt-4">
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="gap-x-6">
                    {Array.from({ length: 6 })
                      .fill(null)
                      .map((_, i) => (
                        <InputOTPSlot
                          index={i}
                          key={i}
                          className="border rounded-lg h-10"
                        />
                      ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <FormMessage className="text-center mt-3" />
            </FormItem>
          )}
        />

        <Button className="rounded-full">ارسال کد تایید</Button>
      </form>
    </Form>
  );
};
