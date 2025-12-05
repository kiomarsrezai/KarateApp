"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { getMyExamRequestApi, createOrUpdateExamRequestApi } from "./api";
import { EXAM_REQUEST_KEY } from "./config";
import { ExamRequest } from "./types";
import { User } from "../user/types";
import { getFilePathWithDefault } from "~/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";

const grades = [
  { value: "Kyu8", label: "کیو 8 (زرد)" },
  { value: "Kyu7", label: "کیو 7 (نارنجی)" },
  { value: "Kyu6", label: "کیو 6 (آبی)" },
  { value: "Kyu5", label: "کیو 5 (سبز)" },
  { value: "Kyu4", label: "کیو 4 (بنفش)" },
  { value: "Kyu3", label: "کیو 3 (قهوه‌ای)" },
  { value: "Kyu2", label: "کیو 2 (قهوه‌ای)" },
  { value: "Kyu1", label: "کیو 1 (قهوه‌ای)" },
  { value: "Dan1", label: "دان 1" },
  { value: "Dan2", label: "دان 2" },
  { value: "Dan3", label: "دان 3" },
  { value: "Dan4", label: "دان 4" },
  { value: "Dan5", label: "دان 5" },
  { value: "Dan6", label: "دان 6" },
  { value: "Dan7", label: "دان 7" },
  { value: "Dan8", label: "دان 8" },
] as const;

const schema = z.object({
  coachName: z.string().min(1, "نام مربی الزامی است"),
  coachPhoneNumber: z
    .string()
    .min(11, "شماره همراه مربی نامعتبر است")
    .max(11, "شماره همراه مربی نامعتبر است"),
  residenceLocation: z.string().min(1, "محل اقامت را وارد کنید"),
  requestedGrade: z.string().min(1, "درجه درخواستی را انتخاب کنید"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  user: User;
};

export const ExamRequestForm = ({ user }: Props) => {
  const {
    data: examRequest,
    isLoading: isLoadingExam,
    refetch,
  } = useQuery({
    queryKey: [EXAM_REQUEST_KEY],
    queryFn: getMyExamRequestApi,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      coachName: "",
      coachPhoneNumber: "",
      residenceLocation: "",
      requestedGrade: "",
    },
  });

  // مسیر تصویر آخرین مدرک (فعلاً از رزومه/فایل‌های موجود کاربر)
  const lastCertificateImagePath = useMemo(() => {
    return user.coachFile || user.refreeFile || user.rezumeFile || null;
  }, [user]);

  useEffect(() => {
    if (examRequest) {
      form.reset({
        coachName: examRequest.coachName,
        coachPhoneNumber: examRequest.coachPhoneNumber,
        residenceLocation: examRequest.residenceLocation,
        requestedGrade: examRequest.requestedGrade,
      });
    }
  }, [examRequest, form]);

  const mutation = useMutation({
    mutationFn: createOrUpdateExamRequestApi,
    onSuccess: async () => {
      toast.success("درخواست شما ثبت شد.");
      await refetch();
    },
    onError: () => {
      toast.error("خطا در ثبت درخواست آزمون");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      ...values,
      lastCertificateImagePath,
    });
  };

  if (isLoadingExam) {
    return <Skeleton className="h-64" />;
  }

  const isEditMode = !!examRequest;
  const buttonLabel = isEditMode ? "ویرایش درخواست" : "ثبت درخواست";

  return (
    <div className="space-y-6">
      {/* اطلاعات غیرقابل ویرایش کاربر */}
      <Card className="p-4 space-y-2">
        <h2 className="font-bold text-lg mb-2">مشخصات شخصی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">نام و نام خانوادگی:</span>{" "}
            <span className="font-medium">
              {user.name} {user.family}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">کد ملی:</span>{" "}
            <span className="font-medium">{user.nationalCode || "-"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">تاریخ تولد:</span>{" "}
            <span className="font-medium">
              {user.birthDate
                ? new Date(user.birthDate).toLocaleDateString("fa-IR")
                : "-"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">شماره همراه:</span>{" "}
            <span className="font-medium">{user.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-muted-foreground text-sm">
            تصویر آخرین مدرک درجه:
          </span>
          <div className="mt-2">
            {lastCertificateImagePath ? (
              <div className="relative w-32 h-32 rounded-md overflow-hidden border">
                <Image
                  src={getFilePathWithDefault(lastCertificateImagePath)}
                  alt="آخرین مدرک"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                مدرکی ثبت نشده است.
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* فرم درخواست آزمون */}
      <Card className="p-4">
        <h2 className="font-bold text-lg mb-4">درخواست شرکت در آزمون Kyu / Dan</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="coachName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام مربی *</FormLabel>
                  <FormControl>
                    <Input placeholder="نام مربی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coachPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره همراه مربی (موجود در سیستم) *</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً 09xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residenceLocation"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>محل اقامت *</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً رشت، گلسار ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestedGrade"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>درخواست ثبت نام *</FormLabel>
                  <FormControl>
                    <select
                      className="border rounded-md px-3 py-2 w-full bg-background"
                      {...field}
                    >
                      <option value="">انتخاب کنید...</option>
                      {grades.map((grade) => (
                        <option key={grade.value} value={grade.value}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={mutation.isPending}>
                {buttonLabel}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
