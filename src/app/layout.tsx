import "./globals.css";
import type { Metadata } from "next";
import { Header } from "~/components/seactions/layout/Header";
import { Footer } from "~/components/seactions/layout/Footer";
import { RtlProvider } from "./RtlProvider";
import { shabnamFont } from "~/font/font";

export const metadata: Metadata = {
  title: "کاراته",
  description: "کاراته",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <RtlProvider>
      <html lang="fa" dir="rtl">
        <body className={`${shabnamFont.className} antialiased`}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <div>
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </RtlProvider>
  );
};

export default RootLayout;
