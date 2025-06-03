import localFont from "next/font/local";

export const shabnamFont = localFont({
  src: [
    {
      path: "./Shabnam-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Shabnam.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Shabnam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Shabnam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
