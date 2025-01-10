import LayoutContent from "@/components/LayoutComponent";
import { AuthProvider } from "@/context/AuthContext";
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
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}

