"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommitteeExamRequestsApi } from "~/components/features/exam-committee/api";
import { COMMITTEE_EXAM_REQUEST_KEY } from "~/components/features/exam-committee/config";
import { CommitteeExamRequestTable } from "~/components/features/exam-committee/table/CommitteeExamRequestTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";

export const PageContent = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    "CoachApproved"
  );

  const query = useQuery({
    queryKey: [COMMITTEE_EXAM_REQUEST_KEY, statusFilter],
    queryFn: () =>
      getCommitteeExamRequestsApi({
        status: statusFilter,
      }),
  });

  if (query.isLoading) {
    return <Skeleton className="h-40" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">درخواست‌های آزمون برای بررسی</h1>
        <div className="w-full md:w-64">
          <Select
            value={statusFilter ?? ""}
            onValueChange={(value) =>
              setStatusFilter(value === "" ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="فیلتر وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CoachApproved">
                تایید شده توسط مربی (در انتظار کمیته)
              </SelectItem>
              <SelectItem value="CommitteeApproved">قبولی‌ها</SelectItem>
              <SelectItem value="CommitteeRejected">ردی‌ها</SelectItem>
              <SelectItem value="">همه وضعیت‌ها</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CommitteeExamRequestTable items={query.data ?? []} />
    </div>
  );
};
