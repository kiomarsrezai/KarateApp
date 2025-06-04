import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
  array,
  enum_,
} from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { UploadIcon } from "lucide-react";

enum Role {
  "Player",
  "Referee",
  "Coach",
}

const FormSchema = object({
  roles: array(enum_(Role)),
  name: pipe(string(), minLength(1, "نام و نام خانوادگی ضروری است")),
  father: pipe(string(), minLength(1, "نام پدر ضروری است")),
  phoneNumber: pipe(
    string(),
    minLength(1, "شماره موبایل ضروری است"),
    check(
      (value) => value.startsWith("09"),
      "شماره موبایل باید با 09 شروع شود"
    ),
    length(11, "شماره موبایل باید 11 رقمی باشد")
  ),
  city: pipe(string(), minLength(1, "شهر ضروری است")),
  age: pipe(string(), minLength(1, "سن ضروری است")),
  address: pipe(string(), minLength(1, "آدرس ضروری است")),
  postalCode: pipe(string(), minLength(1, "کد پستی ضروری است")),
  identityCode: pipe(string(), minLength(1, "کد ملی ضروری است")),
  phoneNumber2: pipe(
    string(),
    minLength(1, "شماره موبایل ضروری است"),
    check(
      (value) => value.startsWith("09"),
      "شماره موبایل باید با 09 شروع شود"
    ),
    length(11, "شماره موبایل باید 11 رقمی باشد")
  ),
  files: pipe(string(), minLength(1, "مدرک ضروری است")),
});

type PhoneNumberFormProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const UserInfoForm = ({ onNext }: PhoneNumberFormProps) => {
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      age: "",
      city: "",
      father: "",
      phoneNumber2: "",
      phoneNumber: "",
      identityCode: "",
      postalCode: "",
      roles: [],
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input
                  dir="ltr"
                  placeholder="09 - - - - - - - - -"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="father"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="انتخاب کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="identityCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد ملی</FormLabel>
              <FormControl>
                <Input placeholder="انتخاب کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره موبایل</FormLabel>
              <FormControl>
                <Input
                  placeholder="09 - - - - - - - - -"
                  dir="ltr"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>شهر / استان</FormLabel>
              <FormControl>
                <Input placeholder="انتخاب کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="age"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>سن</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="تایپ کنید"
                  className="rounded-2xl h-60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="postalCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد پستی</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber2"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن موبایل</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="files"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>بارگذاری مدارک ورزشی</FormLabel>
              <FormControl>
                <div
                  className="border-2 border-dashed h-60 rounded-xl flex items-center justify-evenly"
                  {...field}
                >
                  <p className="text-layer-foreground/50">بارگذاری فایل</p>
                  <UploadIcon className="size-10 text-layer-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="rounded-full">ثبت اطلاعات</Button>
      </form>
    </Form>
  );
};
