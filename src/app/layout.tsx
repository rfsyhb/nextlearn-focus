import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import FloatingToDo from '@/components/FloatingToDo';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'focus.',
  description: 'a leap of faith',
  icons: {
    icon: '/riyalicon.jpeg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <FloatingToDo />
      </body>
    </html>
  );
}
