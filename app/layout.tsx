import type { Metadata } from "next";
import { Noto_Sans_TC, Playfair_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap"
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "慶鴻精密有限公司 | 精密量測、精密加工與工程軟體整合",
  description:
    "慶鴻精密有限公司提供 Mitutoyo 授權產品、工業量測、精密加工、Siemens 工程軟體銷售與整合服務。",
  keywords: ["慶鴻精密", "Mitutoyo", "Siemens", "精密量測", "精密加工", "CNC", "工程軟體"],
  openGraph: {
    title: "慶鴻精密有限公司",
    description: "高端 B2B 工業科技形象官網：精密儀器、工業量測、精密加工、工程軟體整合。",
    type: "website",
    locale: "zh_TW"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
