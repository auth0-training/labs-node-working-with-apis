import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { authorizeRootFolder } from "@/app/authorization";
import { getSession } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
  title: "Okta Drive",
  description: "Your cat picture never felt more at",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session) {
    await authorizeRootFolder(session?.user?.sub);
  }

  return (
    <html lang="en" className="min-h-screen">
      <UserProvider>
        <body className="min-h-screen">
          {children}
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
