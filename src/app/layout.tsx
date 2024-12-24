import LayoutContent from "@/components/LayoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV-LITE",
  description: "An AI Powered Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}

