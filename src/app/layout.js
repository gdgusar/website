import localFont from "next/font/local";
import { Sora } from 'next/font/google';
import "./globals.css";

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
});



export const metadata = {
  title: "GDG USAR",
  description: "Welcome to the Website of Google Developers group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable}`}>
      <body className="noise-background">
        {children}
      </body>
    </html>
  );
}
