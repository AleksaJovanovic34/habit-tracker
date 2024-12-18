import "./globals.css";
import localFont from 'next/font/local';

const myFont = localFont({ src: '/fonts/DepartureMono-Regular.woff' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>habit tracker</title>
      </head>
      <body className={`${myFont.className} bg-black`}>
        {children}
      </body>
    </html>
  );
}
