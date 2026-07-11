import { Metrophobic } from "next/font/google";
import RefContext from '@/contexts/refContext.jsx'
import MatchProvider from '@/contexts/matchContext.jsx';
import MatchPageProvider from "@/contexts/matchPageContext";
import PlayerProvider from '@/contexts/playerContext.jsx';
import "./globals.css";

const font = Metrophobic({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${font.className} w-full h-full`}>
      <body className="min-h-full flex flex-col">
        <RefContext>
          <MatchProvider>
            <MatchPageProvider>
              <PlayerProvider>
                {children}
              </PlayerProvider>
            </MatchPageProvider>
          </MatchProvider>
        </RefContext>
      </body>
    </html>
  );
}
