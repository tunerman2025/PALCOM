import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://palcom.online"),
  title: {
    default: "Palcom | شبكة الهندسة والبرمجة في فلسطين والعالم العربي",
    template: "%s · Palcom",
  },
  description:
    "Palcom (palcom.online) — أكبر شبكة هندسية متخصصة في الهندسة والبرمجة وكل الأنظمة الإلكترونية في فلسطين والعالم العربي: مركبات، أجهزة منزلية، حواسيب، شبكات، هواتف، وهيدروجين.",
  applicationName: "Palcom",
  keywords: [
    "Palcom",
    "palcom.online",
    "هندسة",
    "برمجة",
    "أعطال",
    "DTC",
    "ECU",
    "هيدروجين",
    "شبكة هندسية",
    "فلسطين",
  ],
  openGraph: {
    title: "Palcom | شبكة الهندسة والبرمجة",
    description:
      "أكبر شبكة هندسية متخصصة في الهندسة والبرمجة وكل الأنظمة الإلكترونية — palcom.online.",
    url: "https://palcom.online",
    siteName: "Palcom",
    locale: "ar_PS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="bg-[#050608] text-white antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
