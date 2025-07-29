import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { string, object, pipe, minLength, check, length } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { sendOtpApi } from "../api";
import { useAuthStore } from "./useAuthStore";
import { PhoneNumberInput } from "~/components/common/input/PhoneNumberInput";

const FormSchema = object({
  phoneNumber: pipe(
    string(),
    minLength(1, "شماره موبایل ضروری است"),
    check(
      (value) => value.startsWith("09"),
      "شماره موبایل باید با 09 شروع شود"
    ),
    length(11, "شماره موبایل باید 11 رقمی باشد")
  ),
});

type PhoneNumberFormProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const PhoneNumberForm = ({ onNext }: PhoneNumberFormProps) => {
  // form
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  // mutation
  const authStore = useAuthStore();
  const mutation = useMutation({
    mutationFn: sendOtpApi,
    onSuccess(res, formValues) {
      authStore.setPhoneNumber(formValues.phoneNumber);
      onNext();
    },
  });

  // submit
  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
        <FormField
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره موبایل</FormLabel>
              <FormControl>
                <PhoneNumberInput
                  placeholder="09 - - - - - - - - -"
                  dir="ltr"
                  className="text-left"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
