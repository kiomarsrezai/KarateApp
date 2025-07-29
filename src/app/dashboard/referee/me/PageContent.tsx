"use client";

import { useSession } from "next-auth/react";
import { ProfileForm } from "~/components/features/user/ProfileForm";
import { User } from "~/components/features/user/types";
import { Skeleton } from "~/components/ui/skeleton";

export const PageContent = () => {
  const { data: session } = useSession();

  if (!session?.user) return <Skeleton className="h-50" />;

  return <ProfileForm initValue={session?.user as User} />;
};
