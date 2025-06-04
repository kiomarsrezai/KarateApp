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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره موبایل</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="rounded-full">ارسال کد تایید</Button>
      </form>
    </Form>
  );
};
