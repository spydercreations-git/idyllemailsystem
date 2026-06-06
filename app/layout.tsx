import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Idyll Workspace - Email Dispatcher',
  description: 'Professional email system for Idyll Productions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
