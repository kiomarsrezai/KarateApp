"use client";

import * as Direction from "@radix-ui/react-direction";

export const RtlProvider = ({ children }: React.PropsWithChildren) => {
  return <Direction.Provider dir="rtl">{children}</Direction.Provider>;
};
