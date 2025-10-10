"use client";

import { useSession } from "next-auth/react";
import { RegistraionCard } from "~/components/features/user/RegistraionCard";
import { Button } from "~/components/ui/button";
import { useToImage } from "~/hooks/use-to-image";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { ref, toImage, isPending } = useToImage();

  return (
    <div>
      <div className="flex justify-center">
        <div ref={ref}>
          <RegistraionCard user={user!} />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={toImage} variant={"secondary"} disabled={isPending}>
          دانلود کارت
        </Button>
      </div>
    </div>
  );
};
