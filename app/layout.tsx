import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Barber Shop DZ',
  description: 'احكم بلاصتك عند أحسن الحفافين، وماتستناش فالصف!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
