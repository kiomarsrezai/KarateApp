"use client";

import { useSidebar } from "~/components/ui/sidebar";
import { Button } from "../ui/button";

export const MobilePanelSidebarBtn = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="md:hidden px-6 pt-2">
      <Button
        variant={"outline"}
        onClick={() => setOpenMobile(true)}
        className="w-full"
      >
        باز کردن منوی پنل
      </Button>
    </div>
  );
};
