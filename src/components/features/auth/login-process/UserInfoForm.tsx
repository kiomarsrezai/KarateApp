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
  picklist,
  array,
  date,
  number,
  nullable,
  InferInput,
} from "valibot";
import { signIn } from "next-auth/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { completeProfileApi } from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { allRoles, roles } from "../../user/config";
import { getRoleByValue } from "../../user/utils";
import { UserInfoInputs } from "../../user/UserInfoInputs";

const FormSchema = pipe(
  object({
    selectedRoles: pipe(
      array(picklist(allRoles.map((role) => role.value))),
      minLength(1, "حداقل یه مورد را انتخاب کنید")
    ),
    name: pipe(string(), minLength(1, "نام ضروری است")),
    family: pipe(string(), minLength(1, "نام خانوادگی ضروری است")),
    fatherName: pipe(string(), minLength(1, "نام پدر ضروری است")),
    phoneNumber: pipe(
      string(),
      minLength(1, "شماره موبایل ضروری است"),
      check(
        (value) => value.startsWith("09"),
        "شماره موبایل باید با 09 شروع شود"
      ),
      length(11, "شماره موبایل باید 11 رقمی باشد")
    ),
    cityId: number("شهر ضروری است"),
    address: pipe(string(), minLength(1, "آدرس ضروری است")),
    pOstalCode: pipe(string(), minLength(1, "کد پستی ضروری است")),
    nationalCode: pipe(string(), minLength(1, "کد ملی ضروری است")),
    birthDate: date("تاریخ تولد ضروری است"),
    phoneNumberFamily: pipe(
      string(),
      minLength(1, "شماره موبایل ضروری است"),
      check(
        (value) => value.startsWith("09"),
        "شماره موبایل باید با 09 شروع شود"
      ),
      length(11, "شماره موبایل باید 11 رقمی باشد")
    ),
    rezumeFile: pipe(string("فایل ضروری است"), minLength(1, "فایل ضروری است")),
    avatar: pipe(string("فایل ضروری است"), minLength(1, "فایل ضروری است")),
    refreeFile: nullable(string("فایل ضروری است")),
    coachFile: nullable(string("فایل ضروری است")),
  }),
  check((input) => {
    if (input.selectedRoles.includes(3)) {
      return input.coachFile !== null;
    }
    return true;
  }, "فایل ضروری است"),
  check((input) => {
    if (input.selectedRoles.includes(4)) {
      return input.refreeFile !== null;
    }
    return true;
  }, "فایل ضروری است")
);

// form
type PhoneNumberFormProps = {
  onNext: () => void;
  onPrev: () => void;
  onDone: () => void;
};

export const UserInfoForm = ({ onDone }: PhoneNumberFormProps) => {
  const authStore = useAuthStore();

  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      name: "",
      family: "",
      address: "",
      birthDate: undefined,
      cityId: undefined,
      fatherName: "",
      phoneNumberFamily: "",
      phoneNumber: authStore.phoneNumber ?? "",
      nationalCode: "",
      pOstalCode: "",
      selectedRoles: [2],
      rezumeFile: undefined,
      avatar: undefined,
      refreeFile: null,
      coachFile: null,
    },
  });

  // mutation
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: InferInput<typeof FormSchema>) => {
      const res = await completeProfileApi(data);
      const token = useAuthStore.getState().token;
      await signIn("credentials", { redirect: false, token });
      return res;
    },
    onSuccess(data) {
      toast.success("به انجمن شیتوریو دو ایران خوش آمدید");
      onDone();
      const role = getRoleByValue(data.roles[0]);
      if (!role) return;
      router.push(role.path);
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
          name="selectedRoles"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-x-4">
                {roles.map((item) => (
                  <FormLabel key={item.value}>
                    <span>{item.label}</span>

                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                  </FormLabel>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <UserInfoInputs />

        <Button className="rounded-full" loading={mutation.isPending}>
          ثبت اطلاعات
        </Button>
      </form>
    </Form>
  );
};
