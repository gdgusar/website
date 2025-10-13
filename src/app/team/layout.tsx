// @ts-ignore
import "../globals.css";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Do not render <html> or <body> here — root layout already provides them.
  return <div className="bg-[#D2E3FC] -z-10 font-noto-sans">{children}</div>;
}
