import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danh thiếp HNS",
  description: "Lưu liên hệ và kết bạn Zalo với nhân viên Hanoi Sun Travel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
