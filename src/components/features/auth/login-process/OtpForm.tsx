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
import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../api";
import { useAuthStore } from "./useAuthStore";

const CODE_LENGTH = 4;

const FormSchema = object({
  code: pipe(
    string(),
    minLength(1, "لطفا کد تایید را وارد کنید"),
    length(CODE_LENGTH, "لطفا کد تایید را وارد کنید"),
    check((value) => /^\d+$/.test(value), "فقط کاراکتر های عددی مجاز است")
  ),
});

type PhoneNumberFormProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const OtpForm = ({ onNext, onPrev }: PhoneNumberFormProps) => {
  // form
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  // mutation
  const authStore = useAuthStore();
  const mutation = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess(res) {
      authStore.setToken(res.token);
      onNext();
    },
  });

  // submit
  const onSubmit = form.handleSubmit((values) => {
    if (!authStore.phoneNumber) {
      onPrev();
      return;
    }

    mutation.mutate({
      phoneNumber: authStore.phoneNumber,
      code: values.code,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-center">
                <FormLabel className="font-normal">
                  کد تایید {CODE_LENGTH} رقمی
                </FormLabel>
              </div>
              <div dir="ltr" className="flex justify-center mt-4">
                <InputOTP maxLength={CODE_LENGTH} {...field}>
                  <InputOTPGroup className="md:gap-x-6">
                    {Array.from({ length: CODE_LENGTH })
                      .fill(null)
                      .map((_, i) => (
                        <InputOTPSlot
                          index={i}
                          key={i}
                          className="md:border md:rounded-lg h-10"
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
