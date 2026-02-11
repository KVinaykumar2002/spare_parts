import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import ToastListener from "@/components/ToastListener";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "ANANDH BunkStores",
  description: "ANANDH BunkStores - One Stop shop For All Petrol Pump Material",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white" style={{ backgroundColor: '#ffffff' }}>
      <body className="antialiased bg-white" style={{ backgroundColor: '#ffffff', margin: 0, padding: 0 }}>
        <ErrorReporter />
        <ToastListener />
        <Toaster />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <AppShell>{children}</AppShell>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
