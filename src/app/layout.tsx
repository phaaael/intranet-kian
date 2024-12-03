import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael Intranet",
  description: "Intranet para empresa Kian Importação LTDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
