import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "~/components/seactions/layout/Header";
import { Footer } from "~/components/seactions/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "کاراته",
  description: "کاراته",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
