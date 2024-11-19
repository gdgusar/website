import {Sora, Noto_Sans} from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "700"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "700"],
});

export const metadata = {
  title: "GDG USAR",
  description: "A community of developers and tech enthusiasts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${notoSans.variable} noise-background`}>
        {children}
      </body>
    </html>
  );
}
