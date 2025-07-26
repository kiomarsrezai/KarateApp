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
      <Tabs
        value={filter}
        onValueChange={setFilter}
        orientation="vertical"
        className="max-w-md w-full flex flex-row items-start gap-4 justify-center"
      >
        <TabsList className="shrink-0 grid grid-cols-1 h-auto w-fit gap-1">
          <TabsTrigger value="board">هیئت رئیسه</TabsTrigger>
          <TabsTrigger value="executive">کادر اجرایی</TabsTrigger>
          <TabsTrigger value="representatives">نماینده ها</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
