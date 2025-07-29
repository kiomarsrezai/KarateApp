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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { completeProfileApi } from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import { DatePicker } from "~/components/common/input/DatePicker";
import { useState } from "react";
import { ProvinceInput } from "../../location/ProvinceInput";
import { CityInput } from "../../location/CityInput";
import { Label } from "~/components/ui/label";
import { roles } from "../../user/config";
import { getRoleByValue } from "../../user/utils";
import { FilePickerCard } from "~/components/common/input/FilePickerCard";
import { PhoneNumberInput } from "~/components/common/input/PhoneNumberInput";

const FormSchema = pipe(
  object({
    selectedRoles: pipe(
      array(picklist(roles.map((role) => role.value))),
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

// locations
type locationInputProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
};
const LocationInput = ({ onChange, value }: locationInputProps) => {
  const [provinceId, setProvinceId] = useState<null | number>(null);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>استان</Label>
        <ProvinceInput value={provinceId} onChange={setProvinceId} />
        <FormMessage />
      </div>

      <FormItem>
        <FormLabel>شهر</FormLabel>
        <FormControl>
          <CityInput
            value={value}
            onChange={onChange}
            provinceId={provinceId}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

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
      refreeFile: undefined,
      coachFile: undefined,
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

  // roles
  const selectedRoles = form.watch("selectedRoles");
  const isCoach = selectedRoles.includes(3);
  const isReferee = selectedRoles.includes(4);

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

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="family"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fatherName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام پدر</FormLabel>
              <FormControl>
                <Input placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="nationalCode"
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
                <PhoneNumberInput
                  placeholder="09 - - - - - - - - -"
                  dir="ltr"
                  disabled
                  className="!opacity-100 text-left"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="cityId"
          control={form.control}
          render={({ field }) => <LocationInput {...field} />}
        />

        <FormField
          name="birthDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاریخ تولد</FormLabel>
              <FormControl>
                <DatePicker {...field} />
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
          name="pOstalCode"
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
          name="phoneNumberFamily"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تلفن یک نفر همراه</FormLabel>
              <FormControl>
                <PhoneNumberInput placeholder="تایپ کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>بارگذاری عکس پرسنلی</FormLabel>
              <FormControl>
                <FilePickerCard {...field} type="profile" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="rezumeFile"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>یارگزاری تصویر آخرین مدرک کمربند</FormLabel>
              <FormControl>
                <FilePickerCard {...field} type="certificate" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCoach && (
          <FormField
            name="coachFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>بارگذاری مدارک مربیگری</FormLabel>
                <FormControl>
                  <FilePickerCard {...field} type="coach" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isReferee && (
          <FormField
            name="refreeFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>بارگزاری تصویر مدارک داوری</FormLabel>
                <FormControl>
                  <FilePickerCard {...field} type="refree" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button className="rounded-full">ثبت اطلاعات</Button>
      </form>
    </Form>
  );
};
