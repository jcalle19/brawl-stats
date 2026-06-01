import { Geist, Geist_Mono } from "next/font/google";
import MatchProvider from '@/contexts/matchContext.jsx';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <MatchProvider>
          {children}
        </MatchProvider>
      </body>
    </html>
  );
}
