import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  string,
  object,
  pipe,
  minLength,
  check,
  length,
  InferInput,
} from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { getUserByToken, verifyOtpApi } from "../api";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { getRoleByValue } from "../../user/utils";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
  onDone: () => void;
};

export const OtpForm = ({ onNext, onPrev, onDone }: PhoneNumberFormProps) => {
  // form
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  // mutation
  const authStore = useAuthStore();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (
      data: InferInput<typeof FormSchema> & { phoneNumber: string }
    ) => {
      const res = await verifyOtpApi(data);
      const user = await getUserByToken(res.token);
      if (user.isProfileCompleted) {
        await signIn("credentials", { redirect: false, token: res.token });
      }
      return { ...res, registered: user.isProfileCompleted, roles: user.roles };
    },
    onSuccess(res) {
      if (res.registered) {
        toast.success("به انجمن شیتوریو دو ایران خوش آمدید");
        onDone();
        const role = getRoleByValue(res?.roles?.[0]);
        if (!role) return;
        router.push(role.path);
      } else {
        authStore.setToken(res.token);
        onNext();
      }
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

        <Button loading={mutation.isPending} className="rounded-full">
          ارسال کد تایید
        </Button>
      </form>
    </Form>
  );
};
