import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/common/ProgressBarProvider";
import "./globals.css";
import OnlineStatusProvider from "@/lib/context/OnlineStatusProvider";
import { token } from "@/lib/utils";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const cambria = localFont({
  src: "../public/fonts/cambria.ttf",
  variable: "--font-cambria",
});

export const metadata: Metadata = {
  title: "ResumeAI - Professional AI Resume Builder",
  description:
    "Generate a polished, professional resume in just a few clicks with our AI-powered resume builder.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={`/sign-out?token=${token}`}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          logoImageUrl: "/icons/logo.svg",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#1D4ED8" />
        </head>
        <body
          className={`${inter.variable} ${nunito.variable} ${cambria.variable} font-inter`}
        >
          <OnlineStatusProvider />
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
