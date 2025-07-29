import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutBtn = () => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button onClick={onClick} variant={"ghost"} className="text-white">
      خروج از حساب کاربری
    </Button>
  );
};
