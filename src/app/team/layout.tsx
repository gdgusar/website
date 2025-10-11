import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#D2E3FC] -z-10 font-noto-sans">{children}</body>
    </html>
  );
}
