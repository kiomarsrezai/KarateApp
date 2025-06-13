import "./globals.css";
import type { Metadata } from "next";
import { Header } from "~/components/seactions/layout/Header";
import { Footer } from "~/components/seactions/layout/Footer";
import { RtlProvider } from "./RtlProvider";
import { shabnamFont } from "~/font/font";
import { QueryProvider } from "./QueryProvider";
import { Toaster } from "~/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "کاراته",
  description: "کاراته",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <RtlProvider>
          <html lang="fa" dir="rtl">
            <body className={`${shabnamFont.className} antialiased`}>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <div className="relative z-50">
                  <Footer />
                </div>
              </div>
              <Toaster duration={2000} position="top-center" />
            </body>
          </html>
        </RtlProvider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default RootLayout;
