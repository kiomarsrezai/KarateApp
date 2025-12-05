"use client";

import { CommitteeExamRequest } from "../types";
import { Button } from "~/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { committeeDecideExamRequestApi } from "../api";
import { COMMITTEE_EXAM_REQUEST_KEY } from "../config";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getFilePathWithDefault } from "~/lib/utils";
import Image from "next/image";

type Props = {
  items: CommitteeExamRequest[];
};

export const CommitteeExamRequestTable = ({ items }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: { id: number; isApproved: boolean }) =>
      committeeDecideExamRequestApi(params.id, {
        isApproved: params.isApproved,
      }),
    onSuccess: () => {
      toast.success("نتیجه آزمون ثبت شد");
      queryClient.invalidateQueries({
        queryKey: [COMMITTEE_EXAM_REQUEST_KEY],
      });
    },
    onError: () => {
      toast.error("خطا در ثبت نتیجه آزمون");
    },
  });

  const handleDecision = (id: number, isApproved: boolean) => {
    mutation.mutate({ id, isApproved });
  };

  return (
    <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>ورزشکار</TableHead>
            <TableHead>استان / شهر</TableHead>
            <TableHead>درجه درخواستی</TableHead>
            <TableHead>مربی</TableHead>
            <TableHead>محل اقامت</TableHead>
            <TableHead>مدرک قبلی</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                درخواستی برای بررسی وجود ندارد
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {item.athleteName} {item.athleteFamily}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.nationalCode}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.athletePhoneNumber}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{item.provinceName || "-"}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.cityName || ""}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.requestedGrade}</TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{item.coachName}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.coachPhoneNumber}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.residenceLocation}</TableCell>
                <TableCell>
                  {item.lastCertificateImagePath ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                      <Image
                        src={getFilePathWithDefault(
                          item.lastCertificateImagePath
                        )}
                        alt="آخرین مدرک"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      ثبت نشده
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {item.status === "CommitteeApproved" ? (
                    <span className="text-xs text-emerald-600">
                      قبلاً تایید شده
                    </span>
                  ) : item.status === "CommitteeRejected" ? (
                    <span className="text-xs text-destructive">
                      قبلاً رد شده
                    </span>
                  ) : (
                    <div className="flex flex-col gap-2 items-center">
                      <Button
                        size="sm"
                        className="w-24"
                        disabled={mutation.isPending}
                        onClick={() => handleDecision(item.id, true)}
                      >
                        قبولی
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-24"
                        disabled={mutation.isPending}
                        onClick={() => handleDecision(item.id, false)}
                      >
                        ردی
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
