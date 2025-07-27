"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { parseAsString, useQueryState } from "nuqs";

export const IntroductionMenu = () => {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsString.withDefault("board").withOptions({ shallow: false })
  );

  return (
    <div className="flex flex-col gap-y-2 shrink-0">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="shrink-0 sm:grid grid-cols-1 h-auto w-full sm:w-fit gap-1">
          <TabsTrigger value="board">هیئت رئیسه</TabsTrigger>
          <TabsTrigger value="executive">کادر اجرایی</TabsTrigger>
          <TabsTrigger value="representatives">نماینده ها</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
