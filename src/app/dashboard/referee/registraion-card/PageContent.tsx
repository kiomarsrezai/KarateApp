"use client";

import { useSession } from "next-auth/react";
import { RegistraionCard } from "~/components/features/user/RegistraionCard";

export const PageContent = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-center">
      <RegistraionCard />
    </div>
  );
};
