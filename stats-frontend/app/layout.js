import { Metrophobic } from "next/font/google";
import MatchProvider from '@/contexts/matchContext.jsx';
import "./globals.css";

const font = Metrophobic({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${font.className} w-full h-full`}>
      <body className="min-h-full flex flex-col">
        <MatchProvider>
          {children}
        </MatchProvider>
      </body>
    </html>
  );
}
