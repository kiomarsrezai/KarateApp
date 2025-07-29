import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
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
} from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "./api";
import { toast } from "sonner";
import { User } from "./types";
import { allRoles, roles } from "./config";
import { UserInfoInputs } from "./UserInfoInputs";

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
type ProfileFormProps = {
  initValue: User;
};

export const ProfileForm = ({ initValue }: ProfileFormProps) => {
  const form = useForm({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      name: initValue.name ?? "",
      family: initValue.family ?? "",
      address: initValue.address ?? "",
      birthDate: new Date(initValue.birthDate) ?? undefined,
      cityId: initValue.cityId ?? undefined,
      fatherName: initValue.fatherName ?? "",
      phoneNumberFamily: initValue.phoneNumberFamily ?? "",
      phoneNumber: initValue.phoneNumber ?? "",
      nationalCode: initValue.nationalCode ?? "",
      pOstalCode: initValue.pOstalCode ?? "",
      selectedRoles: initValue.roles as any,
      rezumeFile: initValue.rezumeFile ?? undefined,
      avatar: initValue.avatar ?? undefined,
      refreeFile: initValue.refreeFile ?? undefined,
      coachFile: initValue.coachFile ?? undefined,
    },
  });

  // mutation
  const mutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess() {
      toast.success("پروفایل با موفقیت ویرایش شد");
    },
  });

  // submit
  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
        <UserInfoInputs />

        <Button className="rounded-full" loading={mutation.isPending}>
          ثبت اطلاعات
        </Button>
      </form>
    </Form>
  );
};
