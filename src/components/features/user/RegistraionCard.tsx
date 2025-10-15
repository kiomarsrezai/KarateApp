"use client";

import { Logo } from "~/components/common/Logo";
import { User } from "./types";
import { QRCodeSVG } from "qrcode.react";

import React, { createContext, useContext } from "react";
import { getFullName, getRoleByValue } from "./utils";
import Image from "next/image";
import { formatDate } from "date-fns-jalali";

type CardContextType = {
  user: User;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

type CardProviderProps = {
  user: User;
  children: React.ReactNode;
};

const UserProvider = ({ user, children }: CardProviderProps) => (
  <CardContext.Provider value={{ user }}>{children}</CardContext.Provider>
);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

type ContentShape = {
  label: string;
  value: string | null | undefined;
};

type ContentItemProps = {
  data: ContentShape;
};
const ContentItem = ({ data }: ContentItemProps) => {
  return (
    <li>
      <h6 className="text-xs">{data.label}:</h6>
      <p className="font-medium text-lg mt-1">{data.value}</p>
    </li>
  );
};

const ContentList = () => {
  const { user } = useCardContext();
  const roles = user.roles
    .filter((role) => role !== 1)
    .map((role) => getRoleByValue(role))
    .map((role) => role?.label)
    .join("، ");
  const items: ContentShape[] = [
    {
      label: "نام و نام خانوادگی",
      value: getFullName(user),
    },
    {
      label: "سمت",
      value: roles,
    },
    {
      label: "کمربند (درجه)",
      value: "-",
    },
    {
      label: "اعتبار عضویت",
      value: user.MemberShipExpiryDate
        ? formatDate(user.MemberShipExpiryDate, "PPP")
        : "-",
    },
  ];
  return (
    <div className="flex justify-between">
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <ContentItem key={i} data={item} />
        ))}
      </ul>

      <div>
        <Image
          src={"/img/default-profile.png"}
          width={40}
          height={40}
          alt="avatar"
          className="w-20 object-cover object-center"
        />
      </div>
    </div>
  );
};

const CardHeader = () => {
  return (
    <div className="flex items-center gap-4 bg-[#70131e] p-4">
      <Logo />
      <h3 className="font-bold text-xl">انجمن شیتوریو کاراته دو ایران</h3>
    </div>
  );
};

const CardFooter = () => {
  return (
    <div className="flex items-center gap-4 bg-[#70131e] p-4">
      {/* <Logo />
      <h3 className="font-bold text-xl">انجمن شیتوریو کاراته دو ایران</h3> */}
    </div>
  );
};

type RegistraionCardProps = {
  user: User;
};
export const RegistraionCard = ({ user }: RegistraionCardProps) => {
  return (
    <CardContext value={{ user }}>
      <div className="w-[400px] bg-[#d72638] text-white rounded-4xl overflow-hidden">
        <CardHeader />
        <div className="p-4">
          <ContentList />
        </div>
        <div className="flex justify-center mt-6 mb-10">
          <QRCodeSVG value={process.env.NEXT_PUBLIC_FRONT_URL} />
        </div>

        <CardFooter />
      </div>
    </CardContext>
  );
};
