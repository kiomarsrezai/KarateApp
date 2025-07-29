import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { DatePicker } from "~/components/common/input/DatePicker";
import { FilePickerCard } from "~/components/common/input/FilePickerCard";
import { PhoneNumberInput } from "~/components/common/input/PhoneNumberInput";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { CityInput } from "../location/CityInput";
import { ProvinceInput } from "../location/ProvinceInput";

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

export const UserInfoInputs = () => {
  const form = useFormContext();

  // roles
  const selectedRoles = form.watch("selectedRoles");
  const isCoach = selectedRoles.includes(3);
  const isReferee = selectedRoles.includes(4);
  return (
    <>
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
    </>
  );
};
